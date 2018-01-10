import User from '../shared/models/User';
import { ResultCode } from '../shared/ResultCode';
import * as mysql from 'mysql';
import Const from '../shared/Const';
import SearchData from '../shared/models/SearchData';

export default class DB {
	private static readonly _pool: mysql.Pool = mysql.createPool({
		connectionLimit: 10,
		host: Const.dbHost,
		port: Const.dbPort,
		user: Const.dbUser,
		password: Const.dbPassword,
		database: Const.dbName
	});

	public static createDialog(name: string, userId: number, callback: (result: ResultCode) => void): void {
		return;
	}

	public static getFriends(userId: number, callback: (result: ResultCode, friends?: User[]) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}
			const query: string = 'SELECT user.id, user.name, user.surname, user.city, user.birthday, '
				+ 'file.path AS avatarPath FROM user LEFT JOIN file ON user.id_file_avatar = file.id '
				+ 'WHERE user.id IN (SELECT id_friend FROM user_friend WHERE id_user = ?)';
			connection.query(query, userId, (queryErr: mysql.MysqlError | null, queryResult: User[]) => {
				connection.release();
				if (queryErr) {
					callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK, queryResult);
			});
		});
	}

	public static deleteFriend(userId: number, friendId: number, callback: (result: ResultCode) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}
			const query: string = 'DELETE FROM user_friend WHERE id_user = ? AND id_friend = ?';
			connection.query(query, [userId, friendId], (queryErr: mysql.MysqlError | null) => {
				connection.release();
				if (queryErr) {
					callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK);
			});
		});
	}

	public static addFriend(userId: number, friendId: number, callback: (result: ResultCode) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}
			const data: object = {
				id: null,
				id_user: userId,
				id_friend: friendId
			};
			const query: string = 'INSERT INTO user_friend SET ?';
			connection.query(query, data, (queryErr: mysql.MysqlError | null) => {
				connection.release();
				if (queryErr) {
					callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK);
			});
		});
	}

	public static isFriend(
			userId: number, friendId: number, callback: (result: ResultCode, friend?: boolean) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}
			const query: string = 'SELECT COUNT(*) AS count FROM user_friend WHERE id_user = ? AND id_friend = ?';
			connection.query(query, [userId, friendId], (queryErr: mysql.MysqlError | null, queryResult: any) => {
				connection.release();
				if (queryErr) {
					callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK, queryResult[0].count !== 0);
			});
		});
	}

	public static searchUsers(data: SearchData, limit: number, offset: number,
			callback: (result: ResultCode, users?: User[]) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const values: any[] = [];
			let condition: string = '';

			if (data.name !== undefined) {
				condition = ' WHERE user.name = ?';
				values.push(data.name);
			}
			if (data.surname !== undefined) {
				condition = (condition) ? condition + ' AND user.surname = ?' : ' WHERE user.surname = ?';
				values.push(data.surname);
			}
			if (data.city !== undefined) {
				condition = (condition) ? condition + ' AND user.city = ?' : ' WHERE user.city = ?';
				values.push(data.city);
			}
			if (data.minBirthday !== undefined) {
				condition = (condition) ? condition + ' AND user.birthday >= ?' : ' WHERE user.birthday >= ?';
				values.push(data.minBirthday);
			}
			if (data.maxBirthday !== undefined) {
				condition = (condition) ? condition + ' AND user.birthday <= ?' : ' WHERE user.birthday <= ?';
				values.push(data.maxBirthday);
			}

			values.push(limit);
			values.push(offset);

			const query: string = 'SELECT user.id, user.name, user.surname, user.city, user.birthday, '
				+ 'file.path AS avatarPath FROM user LEFT JOIN file ON user.id_file_avatar = file.id'
				+ condition + ' ORDER BY user.id LIMIT ? OFFSET ?';

			connection.query(query, values, (queryErr: mysql.MysqlError | null, queryResult: any) => {
				if (queryErr) {
					console.log(queryErr);
					return callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK, queryResult);
			});
		});
	}

	public static setAvatar(userId: number, avatarId: number, callback: (result: ResultCode) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const query: string = 'UPDATE user SET id_file_avatar = ? WHERE id = ?';
			connection.query(query, [avatarId, userId], (queryErr: mysql.MysqlError | null) => {
				connection.release();
				if (queryErr) {
					return callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK);
			});
		});
	}

	public static saveFile(path: string, callback: (result: ResultCode, id?: number) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const fileInfo: object = {
				id: null,
				path: path
			};

			const query: string = 'INSERT INTO file SET ?';
			connection.query(query, fileInfo, (queryErr: mysql.MysqlError | null, queryResult: any) => {
				connection.release();
				if (queryErr) {
					return callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK, queryResult.insertId);
			});
		});
	}

	public static editUserInfo(user: User, callback: (result: ResultCode) => void): void {
		const newData: object = {
			name: user.name,
			surname: user.surname,
			city: user.city,
			birthday: user.birthday,
			about: user.about
		};

		DB.updateUser(user.id, newData, callback);
	}

	private static updateUser(id: number, dataMap: object, callback: (result: ResultCode) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const query: string = 'UPDATE user SET ? WHERE id = ?';
			connection.query(query, [dataMap, id], (queryErr: mysql.MysqlError | null) => {
				connection.release();
				if (queryErr) {
					return callback(ResultCode.INTERNAL_ERROR);
				}
				callback(ResultCode.OK);
			});
		});
	}

	public static getUserById(id: number, callback: (result: ResultCode, user?: User) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const query: string = 'SELECT user.*, file.path AS avatarPath FROM user ' +
				'LEFT JOIN file ON user.id_file_avatar = file.id WHERE user.id = ?';
			connection.query(query, id, (queryErr: mysql.MysqlError | null, queryResult: any) => {
				connection.release();
				if (queryErr) {
					return callback(ResultCode.INTERNAL_ERROR);
				}
				if (queryResult.length === 0) {
					return callback(ResultCode.USER_NOT_FOUND);
				}
				callback(ResultCode.OK, queryResult[0]);
			});
		});
	}

	public static getUserId(login: string, password: string, callback: (result: ResultCode, id?: number) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const query: string = 'SELECT id, password FROM user WHERE login = ?';
			connection.query(query, login, (queryErr: mysql.MysqlError | null, queryResult: any) => {
				connection.release();
				if (queryErr) {
					return callback(ResultCode.INTERNAL_ERROR);
				}
				if (queryResult.length === 0) {
					return callback(ResultCode.USER_NOT_FOUND);
				}
				if (queryResult[0].password !== password) {
					return callback(ResultCode.WRONG_PASSWORD);
				}
				callback(ResultCode.OK, queryResult[0].id);
			});
		});
	}

	public static insertUser(user: User, callback: (result: ResultCode, id?: number) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			DB.isLoginInUse(user.login, (inUse: ResultCode) => {
				if (inUse === ResultCode.LOGIN_IS_IN_USE) {
					return callback(ResultCode.LOGIN_IS_IN_USE);
				}
				const insertSet: {} = {
					id: null,
					login: user.login,
					password: user.password,
					name: user.name,
					surname: user.surname
				};
				const query: string = 'INSERT INTO user SET ?';
				connection.query(query, insertSet, (queryErr: mysql.MysqlError | null, queryResult: any) => {
					connection.release();
					if (queryErr) {
						return callback(ResultCode.INTERNAL_ERROR);
					}
					callback(ResultCode.OK, queryResult.insertId);
				});
			});
		});
	}

	private static isLoginInUse(login: string, callback: (result: ResultCode) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(ResultCode.INTERNAL_ERROR);
			}

			const query: string = 'SELECT COUNT(*) AS count FROM user WHERE login = ?';
			connection.query(query, login, (queryErr: mysql.MysqlError | null, queryResult: any) => {
				connection.release();
				if (queryErr) {
					callback(ResultCode.INTERNAL_ERROR);
				}
				callback((queryResult[0].count) > 0 ? ResultCode.LOGIN_IS_IN_USE : ResultCode.OK);
			});
		});
	}
}

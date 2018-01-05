import User from '../shared/models/User';
import { ResultCode } from '../shared/ResultCode';
import * as mysql from 'mysql';
import Const from '../shared/Const';

export default class DB {
	private static readonly _pool: mysql.Pool = mysql.createPool({
		connectionLimit: 10,
		host: Const.dbHost,
		port: Const.dbPort,
		user: Const.dbUser,
		password: Const.dbPassword,
		database: Const.dbName
	});

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

	public static updateUser(id: number, dataMap: object, callback: (result: ResultCode) => void): void {
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

			const query: string = 'SELECT user.id, user.login, user.name, user.surname, user.city, user.birthday, user.about, ' +
				'file.name AS avatarPath FROM user LEFT JOIN file ON user.id_file_avatar = file.id WHERE user.id = ?';
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

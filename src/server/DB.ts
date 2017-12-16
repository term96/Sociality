import UserModel from './models/UserModel';
import { Result } from '../shared/Result';
import * as mysql from 'mysql';
import Const from './Const';

export default class DB {
	private static readonly _pool: mysql.Pool = mysql.createPool({
		connectionLimit: 10,
		host: Const.dbHost,
		port: Const.dbPort,
		user: Const.dbUser,
		password: Const.dbPassword,
		database: Const.dbName
	});

	public static getUser(login: string, password: string, callback: (result: Result, user?: UserModel) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(Result.INTERNAL_ERROR);
			}

			const query: string = 'SELECT * FROM user WHERE login = ?';
			connection.query(query, login, (queryErr: mysql.MysqlError | null, queryResult: UserModel[]) => {
				connection.release();
				if (queryErr) {
					return callback(Result.INTERNAL_ERROR);
				}
				if (queryResult.length === 0) {
					return callback(Result.USER_NOT_FOUND);
				}
				if (queryResult[0].password !== password) {
					return callback(Result.WRONG_PASSWORD);
				}
				callback(Result.OK, queryResult[0]);
			});
		});
	}

	public static insertUser(user: UserModel, callback: (result: Result, id?: number) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(Result.INTERNAL_ERROR);
			}

			DB.isLoginInUse(user.login, (inUse: Result) => {
				if (inUse === Result.LOGIN_IS_IN_USE) {
					return callback(Result.LOGIN_IS_IN_USE);
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
						return callback(Result.INTERNAL_ERROR);
					}
					callback(Result.OK, queryResult.insertId);
				});
			});
		});
	}

	private static isLoginInUse(login: string, callback: (result: Result) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(Result.INTERNAL_ERROR);
			}

			const query: string = 'SELECT COUNT(*) AS count FROM user WHERE login = ?';
			connection.query(query, login, (queryErr: mysql.MysqlError | null, queryResult: any) => {
				connection.release();
				if (queryErr) {
					callback(Result.INTERNAL_ERROR);
				}
				callback((queryResult[0].count) > 0 ? Result.LOGIN_IS_IN_USE : Result.OK);
			});
		});
	}
}

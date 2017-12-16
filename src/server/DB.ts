import UserModel from './models/UserModel';
import { Result } from '../shared/Result';
import * as mysql from 'mysql';
import Const from './Const';

export default class DB {
	private static readonly _pool: mysql.Pool = mysql.createPool({
		connectionLimit: 10,
		host: Const.dbHost,
		port: 3306,
		user: Const.dbUser,
		password: Const.dbPassword,
		database: Const.dbName
	});

	public static getUser(login: string, password: string, callback: (result: Result, user?: UserModel) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(Result.INTERNAL_ERROR);
			}
			const query: string = 'SELECT * FROM user WHERE login = ? and password = ?';
			connection.query(query, [login, password], (queryErr: mysql.MysqlError | null, result?: UserModel[]) => {
				if (queryErr) {
					return callback(Result.INTERNAL_ERROR);
				}
				if (result.length === 0) {
					return callback(Result.USER_NOT_FOUND);
				}
				if (result[0].password !== password) {
					return callback(Result.WRONG_PASSWORD);
				}
				callback(Result.OK, result[0]);
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
				const query: string = 'INSERT INTO user (id, login, password, name, surname) VALUES (null, ?, ?, ?, ?)';
				connection.query(query, [user.login, user.password, user.name, user.surname],
					(queryErr: mysql.MysqlError | null, result: any) => {
						if (queryErr) {
							return callback(Result.INTERNAL_ERROR);
						}
						callback(Result.OK, result.insertId);
				});
			});
		});
	}

	private static isLoginInUse(login: string, callback: (result: Result) => void): void {
		DB._pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
			if (err) {
				callback(Result.INTERNAL_ERROR);
			}
			const query: string = 'SELECT COUNT(*) FROM user WHERE login = ? AS count';
			connection.query(query, login, (queryErr: mysql.MysqlError | null, result: any) => {
				if (queryErr) {
					callback(Result.INTERNAL_ERROR);
				}
				callback((result.count) > 0 ? Result.LOGIN_IS_IN_USE : Result.OK);
			});
		});
	}
}

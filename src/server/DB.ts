import UserModel from '../shared/models/UserModel';
import { Result } from './Result';
import * as mysql from 'mysql';
import Const from './Const';

export default class DB {
	private static readonly _connection: mysql.Pool = mysql.createPool({
		connectionLimit: 10,
		host: Const.dbHost,
		port: 3306,
		user: Const.dbUser,
		password: Const.dbPassword,
		database: Const.dbName
	});

	public static getUser(login: string, password: string, callback: (result: Result, user?: UserModel) => void): void {
		DB._connection.getConnection((err: Error, connect: mysql.Connection) => {
			if (err) {
				throw err;
			}
			const query: string = 'SELECT * FROM user WHERE login = ? and password = ?';
			connect.query(query, [login, password], (errCon: mysql.MysqlError | null, result?: UserModel[]) => {
				if (errCon) {
					return callback(Result.INTERNAL_ERROR);
				}
				return (!result || result.length > 0) ? callback(Result.OK, result[0]) : callback(Result.USER_NOT_FOUND);
			});
		});
	}

	public static insertUser(user: UserModel, callback: (result: Result, id?: number) => void): void {
		DB._connection.getConnection((err: Error, connect: mysql.Connection) => {
			if (err) {
				throw err;
			}
			const query: string = 'INSERT INTO user (id, login, password, name, surname) VALUES (null, ?, ?, ?, ?)';
			DB._connection.query(query, [user.login, user.password, user.name, user.surname],
				(errCon: mysql.MysqlError | null, result: any) => {
					if (errCon) {
						callback(Result.INTERNAL_ERROR);
						throw errCon;
					}
					return callback(Result.OK, result.insertId);
				});
		});
	}
}

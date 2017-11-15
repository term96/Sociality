import UserModel from './models/UserModel';
import { Result } from './Result';
import * as mysql from 'mysql';
import Const from './Const';

export default class DB {
	private static readonly _connection: mysql.Connection = mysql.createConnection({
		host: Const.dbHost,
		port: 3306,
		user: Const.dbUser,
		password: Const.dbPassword,
		database: Const.dbName
	});

	public static connect(): void {
		DB._connection.connect((err: Error) => {
			if (err) {
				throw err;
			}
		});
	}

	public static getUser(login: string, password: string, callback: (result: Result, user?: UserModel) => void): void {
		const query: string = 'SELECT * FROM user WHERE login = ? and password = ?';
		DB._connection.query(query, [login, password], (err: mysql.MysqlError | null, result?: UserModel[]) => {
			if (err) {
				return callback(Result.INTERNAL_ERROR);
			}
			return (!result || result.length > 0) ? callback(Result.OK, result[0]) : callback(Result.USER_NOT_FOUND);
		});
	}

	public static insertUser(user: UserModel, callback: (result: Result, id?: number) => void): void {
		const query: string = 'INSERT INTO user (id, login, password) VALUES (null, ?, ?)';
		DB._connection.query(query, [user.login, user.password], (err: mysql.MysqlError | null, result: any) => {
			if (err) {
				callback(Result.INTERNAL_ERROR);
				throw err;
			}
			return callback(Result.OK, result.insertId);
		});
	}
}

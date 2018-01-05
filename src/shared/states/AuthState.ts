import { ResultCode } from '../ResultCode';

export default class AuthState {
	public resultCode?: ResultCode;
	public id?: number;
	public token?: string;

	public constructor(resultCode?: ResultCode, id?: number, token?: string) {
		this.resultCode = resultCode;
		this.id = id;
		this.token = token;
	}
}

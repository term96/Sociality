export default class AuthState {
	public errorNumber?: number;
	public id?: number;
	public token?: string;

	public constructor(errorNumber?: number, id?: number, token?: string) {
		this.errorNumber = errorNumber;
		this.id = id;
		this.token = token;
	}
}

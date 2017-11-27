export default class AuthState {
	private _errorNumber?: number;
	private _id?: number;
	private _token?: string;

	public constructor(errorNumber?: number, id?: number, token?: string) {
		this._errorNumber = errorNumber;
		this._id = id;
		this._token = token;
	}

	public get errorNumber(): number {
		return this._errorNumber;
	}

	public get id(): number {
		return this._id;
	}

	public get token(): string {
		return this._token;
	}
}
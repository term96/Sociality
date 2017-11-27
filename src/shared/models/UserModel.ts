export default class UserModel {
	private _id?: number;
	private _login?: string;
	private _password?: string;
	private _name?: string;
	private _surname?: string;
	private _city?: string;
	private _birthday?: Date;
	private _about?: string;
	private _avatar?: any;

	public constructor(id?: number, login?: string, password?: string, name?: string, surname?: string, city?: string,
			birthday?: Date, about?: string, avatar?: any) {
		this._id = id;
		this._login = login;
		this._password = password;
		this._name = name;
		this._surname = surname;
		this._city = city;
		this._birthday = birthday;
		this._about = about;
		this._avatar = avatar;
	}

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get login(): string {
		return this._login;
	}

	public set login(value: string) {
		this._login = value;
	}

	public get password(): string {
		return this._password;
	}

	public set password(value: string) {
		this._password = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get surname(): string {
		return this._surname;
	}

	public set surname(value: string) {
		this._surname = value;
	}

	public get city(): string {
		return this._city;
	}

	public set city(value: string) {
		this._city = value;
	}

	public get birthday(): Date {
		return this._birthday;
	}

	public set birthday(value: Date) {
		this._birthday = value;
	}

	public get about(): string {
		return this._about;
	}

	public set about(value: string) {
		this._about = value;
	}

	public get avatar(): any {
		return this._avatar;
	}

	public set avatar(value: any) {
		this._avatar = value;
	}
}

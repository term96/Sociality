export default class UserModel {
	public id?: number;
	public login?: string;
	public password?: string;
	public name?: string;
	public surname?: string;
	public city?: string;
	public birthday?: Date;
	public about?: string;
	public avatar?: any;

	public constructor(id?: number, login?: string, password?: string, name?: string, surname?: string, city?: string,
			birthday?: Date, about?: string, avatar?: any) {
		this.id = id;
		this.login = login;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.city = city;
		this.birthday = birthday;
		this.about = about;
		this.avatar = avatar;
	}
}

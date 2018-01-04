export default class User {
	public id?: number;
	public login?: string;
	public password?: string;
	public name?: string;
	public surname?: string;
	public city?: string;
	public birthday?: number;
	public about?: string;
	public avatarPath?: string;

	public constructor(id?: number, login?: string, password?: string, name?: string, surname?: string, city?: string,
			birthday?: number, about?: string, avatarPath?: string) {
		this.id = id;
		this.login = login;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.city = city;
		this.birthday = birthday;
		this.about = about;
		this.avatarPath = avatarPath;
	}
}

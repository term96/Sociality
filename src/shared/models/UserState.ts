export default class UserState {
	public errorNumber?: number;
	public id?: number;
	public name?: string;
	public surname?: string;
	public city?: string;
	public birthday?: Date;
	public about?: string;
	public avatarSrc?: string;

	constructor(errorNumber?: number, id?: number, name?: string, surname?: string, city?: string, birthday?: Date,
			about?: string, avatarSrc?: string) {
		this.errorNumber = errorNumber;
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.city = city;
		this.birthday = birthday;
		this.about = about;
		this.avatarSrc = avatarSrc;
	}
}
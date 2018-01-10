import { ResultCode } from '../ResultCode';

export default class EditState {
	public resultCode?: ResultCode;
	public login?: string;
	public name?: string;
	public surname?: string;
	public city?: string;
	public birthday?: number;
	public about?: string;
	public avatarPath?: string;

	public constructor(resultCode?: ResultCode, login?: string, name?: string, surname?: string,
			city?: string, birthday?: number, about?: string, avatarPath?: string) {
		this.resultCode = resultCode;
		this.login = login;
		this.name = name;
		this.surname = surname;
		this.city = city;
		this.birthday = birthday;
		this.about = about;
		this.avatarPath = avatarPath;
	}
}

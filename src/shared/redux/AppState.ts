import AuthState from '../models/AuthState';

export class AppState {
	public authState: AuthState;
	public userState: UserState;
}

export class UserState {
	public errorNumber?: number;
	public id?: number;
	public name?: string;
	public surname?: string;
	public city?: string;
	public birthday?: Date;
	public about?: string;
	public avatarSrc?: string;
}

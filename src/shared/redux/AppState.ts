import AuthState from '../states/AuthState';
import UserState from '../states/UserState';
import EditState from '../states/EditState';

export default class AppState {
	public authState: AuthState;
	public userState: UserState;
	public editState: EditState;
}

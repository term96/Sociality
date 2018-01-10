import AuthState from '../states/AuthState';
import UserState from '../states/UserState';
import EditState from '../states/EditState';
import SearchState from '../states/SearchState';

export default class AppState {
	public authState: AuthState;
	public userState: UserState;
	public editState: EditState;
	public searchState: SearchState;
}

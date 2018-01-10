import AuthState from './states/AuthState';
import Const from './Const';

export default class LocalStorageProvider {
	static saveAuthState(authInfo: AuthState): void {
		try {
			window.localStorage.setItem(Const.storageToken, authInfo.token);
			window.localStorage.setItem(Const.storageId, authInfo.id.toString());
		} catch (e) {
			return;
		}
	}

	static getAuthState(): AuthState {
		try {
			const id: number = parseInt(window.localStorage.getItem(Const.storageId), 10);
			const token: string = window.localStorage.getItem(Const.storageToken);
			return new AuthState(undefined, id, token);
		} catch (e) {
			return new AuthState();
		}
	}

	static removeAuthState(): void {
		try {
			window.localStorage.removeItem(Const.storageToken);
			window.localStorage.removeItem(Const.storageId);
		} catch (e) {
			return;
		}
	}
}

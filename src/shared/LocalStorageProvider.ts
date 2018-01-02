import AuthInfo from './models/AuthInfo';
import Const from './Const';

export default class LocalStorageProvider {
	static saveAuthInfo(authInfo: AuthInfo): void {
		try {
			window.localStorage.setItem(Const.storageToken, authInfo.token);
			window.localStorage.setItem(Const.storageId, authInfo.id.toString());
		} catch (e) {
			return;
		}
	}

	static getAuthInfo(): AuthInfo {
		try {
			const id: number = parseInt(window.localStorage.getItem(Const.storageId), 10);
			const token: string = window.localStorage.getItem(Const.storageToken);
			return new AuthInfo(undefined, id, token);
		} catch (e) {
			return new AuthInfo();
		}
	}

	static removeAuthInfo(): void {
		try {
			window.localStorage.removeItem(Const.storageToken);
			window.localStorage.removeItem(Const.storageId);
		} catch (e) {
			return;
		}
	}
}

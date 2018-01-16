import { ActionTypes } from '../actions/ActionTypes';
import AuthState from '../../states/AuthState';
import LocalStorageProvider from '../../LocalStorageProvider';

export default (state: AuthState, action: any) => {
	if (state === undefined) {
		const authInfo: AuthState = LocalStorageProvider.getAuthState();
		return new AuthState(
			state === undefined ? undefined : state.resultCode,
			authInfo.id,
			authInfo.token
		);
	}
	if (action.type === ActionTypes.SIGN_UP || action.type === ActionTypes.SIGN_IN) {
		const authInfo: AuthState = action.payload;
		LocalStorageProvider.saveAuthState(authInfo);

		return new AuthState(authInfo.resultCode, authInfo.id, authInfo.token);
	}

	if (action.type === ActionTypes.SIGN_OUT) {
		LocalStorageProvider.removeAuthState();
		return new AuthState(state.resultCode);
	}
	return state;
};

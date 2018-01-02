import { ActionTypes } from '../actions/ActionTypes';
import AuthState from '../../states/AuthState';
import AuthInfo from '../../models/AuthInfo';
import LocalStorageProvider from '../../LocalStorageProvider';

export default (state: AuthState, action: any) => {
	if (action.type === ActionTypes.SIGN_UP || action.type === ActionTypes.SIGN_IN) {
		const authInfo: AuthInfo = action.payload;
		LocalStorageProvider.saveAuthInfo(authInfo);

		return new AuthState(authInfo.errorNumber, authInfo.id, authInfo.token);
	}

	if (action.type === ActionTypes.SIGN_OUT) {
		LocalStorageProvider.removeAuthInfo();
		return new AuthState(state.errorNumber);
	}

	if (state === undefined) {
		const authInfo: AuthInfo = LocalStorageProvider.getAuthInfo();
		return new AuthState(
			state === undefined ? undefined : state.errorNumber,
			authInfo.id,
			authInfo.token
		);
	}
	return state;
};

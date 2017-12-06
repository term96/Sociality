import { ActionTypes } from '../actions/ActionTypes';
import AuthState from '../../models/AuthState';

export default (state: AuthState, action: any) => {
	if (state === undefined) {
		return {};
	}
	if (action.type === ActionTypes.SIGN_UP || action.type === ActionTypes.SIGN_IN) {
		return {
			...action.payload
		};
	}
	return {
		...state
	};
};

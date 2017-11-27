import { ActionTypes } from '../actions/ActionTypes';
export default (state: any, action: any) => {
	if (state === undefined) {
		return {};
	}
	if (action.type === ActionTypes.MAIN_SIGN_UP) {
		return {
			...state,
			...action.payload
		};
	}
	return {
		...state
	};
};

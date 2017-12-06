import { ActionTypes } from '../actions/ActionTypes';

export default (state: any, action: any) => {
	if (state === undefined) {
		return {};
	}
	if (action.type === ActionTypes.GET_USER_INFO) {
		return {
			...action.payload
		};
	}
	return {
		...state
	};
};

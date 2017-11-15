import { ActionTypes } from '../actions/ActionTypes';

export default (state: any, action: any) => {
	if (state === undefined) {
		return {};
	}
	if (action.type === ActionTypes.USER_GET_INFO) {
		return { ...state,
			...action.payload
		};
	}
};

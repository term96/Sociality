import { ActionTypes } from '../actions/ActionTypes';
import UserState from '../../states/UserState';

export default (state: UserState, action: any) => {
	if (state === undefined || action.type === ActionTypes.RESET_USER_INFO) {
		return new UserState();
	}
	if (action.type === ActionTypes.GET_USER_INFO) {
		return action.payload;
	}
	return state;
};

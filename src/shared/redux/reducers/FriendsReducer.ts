import { ActionTypes } from '../actions/ActionTypes';
import FriendsState from '../../states/FriendsState';

export default (state: FriendsState, action: any) => {
	if (state === undefined || action.type === ActionTypes.RESET_FRIENDS_LIST) {
		return new FriendsState();
	}
	if (action.type === ActionTypes.LOAD_FRIENDS_LIST) {
		const newData: FriendsState = action.payload;
		return new FriendsState(newData.resultCode, (newData.users !== undefined) ? newData.users : []);
	}
	return state;
};

import { ActionTypes } from '../actions/ActionTypes';
import SearchState from '../../states/SearchState';
import User from '../../models/User';

export default (state: SearchState, action: any) => {
	if (state === undefined || action.type === ActionTypes.RESET_SEARCH_DATA) {
		return new SearchState();
	}
	if (action.type === ActionTypes.LOAD_SEARCH_DATA) {
		const newData: SearchState = action.payload;
		const users: User[] = (state.users !== undefined) ? state.users : [];
		if (newData.users) {
			users.push(...newData.users);
		}
		return new SearchState(newData.resultCode, users);
	}
	return state;
};

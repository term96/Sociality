import { ActionTypes } from '../actions/ActionTypes';
import ConversationsState from '../../states/ConversationsState';

export default (state: ConversationsState, action: any) => {
	if (state === undefined || action.type === ActionTypes.RESET_CONVERSATIONS) {
		return new ConversationsState();
	}
	if (action.type === ActionTypes.LOAD_CONVERSATIONS) {
		const newData: ConversationsState = action.payload;
		return new ConversationsState(newData.resultCode, (newData.conversations !== undefined) ? newData.conversations : []);
	}
	return state;
};

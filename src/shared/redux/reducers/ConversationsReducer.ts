import { ActionTypes } from '../actions/ActionTypes';
import ConversationsState from '../../states/ConversationsState';
import Conversation from '../../models/Conversation';
import Message from '../../models/Message';

export default (state: ConversationsState, action: any) => {
	if (state === undefined || action.type === ActionTypes.RESET_CONVERSATIONS) {
		return new ConversationsState();
	}
	if (action.type === ActionTypes.LOAD_CONVERSATIONS) {
		const newData: ConversationsState = action.payload;
		return new ConversationsState(newData.resultCode, (newData.conversations !== undefined) ? newData.conversations : []);
	}
	if (action.type === ActionTypes.LOAD_MESSAGES) {
		const newData: ConversationsState = action.payload;
		const newArr: Conversation[] = [...state.conversations];

		if (newData.conversations) {
			const newConversation: Conversation = newData.conversations[0];
			newArr.forEach((value: Conversation, index: number) => {
				newArr[index].messages = [...state.conversations[index].messages];
				if (value.id === newConversation.id) {
					newArr[index].messages.push(...newConversation.messages);
					newArr[index].messages.sort((a: Message, b: Message) => {
						return a.id - b.id;
					});
				}
			});
		}
		return new ConversationsState(newData.resultCode, newArr);
	}
	if (action.type === ActionTypes.SEND_MESSAGE) {
		const newData: ConversationsState = action.payload;
		return new ConversationsState(newData.resultCode, state.conversations);
	}
	if (action.type === ActionTypes.RESET_MESSAGES) {
		const newArr: Conversation[] = [...state.conversations];

		newArr.forEach((value: Conversation, index: number) => {
			newArr[index].messages = [];
		});
		return new ConversationsState(state.resultCode, newArr);
	}
	return state;
};

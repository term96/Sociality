import Conversation from '../models/Conversation';
import { ResultCode } from '../ResultCode';

export default class ConversationsState {
	public resultCode: ResultCode;
	public conversations: Conversation[];

	public constructor(resultCode?: ResultCode, conversations?: Conversation[]) {
		this.resultCode = resultCode;
		this.conversations = conversations;
	}
}

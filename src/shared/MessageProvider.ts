import { Result } from './Result';
import { Message } from './Message';

export default class MessageProvider {
	public static getMessage(result: Result): string {
		switch (result) {
			case Result.INTERNAL_ERROR:
				return Message.INTERNAL_ERROR as string;
			case Result.USER_NOT_FOUND:
				return Message.USER_NOT_FOUND as string;
			case Result.LOGIN_IS_IN_USE:
				return Message.LOGIN_IS_IN_USE as string;
			case Result.WRONG_PASSWORD:
				return Message.WRONG_PASSWORD as string;
			case Result.INVALID_BODY:
				return Message.INVALID_BODY as string;
			case Result.CONNECTION_ERROR:
				return Message.CONNECTION_ERROR as string;
			case Result.TOKEN_REQUIRED:
				return Message.TOKEN_REQUIRED as string;
			default:
				return undefined;
		}
	}
}

import { ResultCode } from './ResultCode';
import { Message } from './Message';

export default class MessageProvider {
	public static getMessage(result: ResultCode): string {
		switch (result) {
			case ResultCode.INTERNAL_ERROR:
				return Message.INTERNAL_ERROR as string;
			case ResultCode.USER_NOT_FOUND:
				return Message.USER_NOT_FOUND as string;
			case ResultCode.LOGIN_IS_IN_USE:
				return Message.LOGIN_IS_IN_USE as string;
			case ResultCode.WRONG_PASSWORD:
				return Message.WRONG_PASSWORD as string;
			case ResultCode.INVALID_BODY:
				return Message.INVALID_BODY as string;
			case ResultCode.CONNECTION_ERROR:
				return Message.CONNECTION_ERROR as string;
			case ResultCode.TOKEN_REQUIRED:
				return Message.TOKEN_REQUIRED as string;
			default:
				return Message.OK as string;
		}
	}
}

import { ResultCode } from '../ResultCode';
import User from '../models/User';
export default class SearchState {
	public resultCode: ResultCode;
	public users: User[];

	public constructor(resultCode?: ResultCode, users?: User[]) {
		this.resultCode = resultCode;
		this.users = users;
	}
}

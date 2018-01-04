import { ActionTypes } from '../actions/ActionTypes';
import UserInfo from '../../models/UserInfo';
import UserState from '../../states/UserState';

export default (state: UserState, action: any) => {
	if (state === undefined) {
		return new UserState();
	}
	if (action.type === ActionTypes.GET_USER_INFO) {
		const payload: UserInfo = action.payload;
		return new UserState(
			payload.errorNumber, payload.id, payload.name, payload.surname,
			payload.city, payload.birthday, payload.about, payload.avatarPath
		);
	}
	return state;
};

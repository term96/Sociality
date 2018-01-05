import { ActionTypes } from '../actions/ActionTypes';
import EditState from '../../states/EditState';

export default (state: EditState, action: any) => {
	if (state === undefined || action.type === ActionTypes.RESET_EDITABLE_USER_INFO) {
		return new EditState();
	}
	if (action.type === ActionTypes.EDIT_USER_INFO || action.type === ActionTypes.GET_EDITABLE_USER_INFO) {
		return action.payload;
	}
	return state;
};

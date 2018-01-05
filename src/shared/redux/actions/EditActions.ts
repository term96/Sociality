import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { ResultCode } from '../../ResultCode';
import User from '../../models/User';
import EditState from '../../states/EditState';

export const editUserInfo: any = (user: User, token: string) => {
	return (dispatch: Function) => {
		axios.put(`/api/edit/info/${token}`, user).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.EDIT_USER_INFO,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.EDIT_USER_INFO,
				payload: new EditState(ResultCode.CONNECTION_ERROR)
			});
		});
	};
};

export const getEditableUserInfo: any = (token: string) => {
	return (dispatch: Function) => {
		dispatch({
			type: ActionTypes.RESET_EDITABLE_USER_INFO
		});
		axios.get(`/api/edit/${token}`).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.GET_EDITABLE_USER_INFO,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.GET_EDITABLE_USER_INFO,
				payload: new EditState(ResultCode.CONNECTION_ERROR)
			});
		});
	};
};

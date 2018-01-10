import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { ResultCode } from '../../ResultCode';
import UserState from '../../states/UserState';

export const getUserInfo: any = (id: number, token: string) => {
	return (dispatch: Function) => {
		dispatch({
			type: ActionTypes.RESET_USER_INFO
		});
		axios.get(`/api/users/${id}/${token}`).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.GET_USER_INFO,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.GET_USER_INFO,
				payload: new UserState(ResultCode.CONNECTION_ERROR)
			});
		});
	};
};

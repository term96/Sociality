import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { Result } from '../../Result';

export const getUserInfo: any = (id: number) => {
	return (dispatch: Function) => {
		axios.get(`/api/users/${id}`).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.GET_USER_INFO,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.GET_USER_INFO,
				payload: {
					errorNumber: Result.CONNECTION_ERROR
				}
			});
		});
	};
};

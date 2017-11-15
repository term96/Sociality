import axios from 'axios';
import { ActionTypes } from './ActionTypes';

export const getUserInfo: any = (id: number) => {
	return async (dispatch: Function, getState: Function) => {
		const response: any = await axios.get('/api/users');
		dispatch({
			type: ActionTypes.USER_GET_INFO,
			payload: {
				...response.data
			}
		});
	};
};

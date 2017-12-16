import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { Result } from '../../Result';

export const signUp: any = (login: string, password: string, name: string, surname: string) => {
	return (dispatch: Function) => {
		// const data: object = {
		// 	login: login,
		// 	password: password,
		// 	name: name,
		// 	surname: surname
		// };
		// const response: any = await axios.post('/api/users/sign_up', data);
		// dispatch({
		// 	type: ActionTypes.SIGN_UP,
		// 	payload: {
		// 		...response.data
		// 	}
		// });
		const data: object = {
			login: login,
			password: password,
			name: name,
			surname: surname
		};
		axios.post('/api/users/sign_up', data).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.SIGN_UP,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.SIGN_UP,
				payload: {
					errorNumber: Result.CONNECTION_ERROR
				}
			});
		});
	};
};

export const signIn: any = (login: string, password: string) => {
	return (dispatch: Function) => {
		const data: object = {
			login: login,
			password: password
		};
		axios.post('/api/users/sign_in', data).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.SIGN_IN,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.SIGN_IN,
				payload: {
					errorNumber: Result.CONNECTION_ERROR
				}
			});
		});
	};
};

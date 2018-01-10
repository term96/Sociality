import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { ResultCode } from '../../ResultCode';
import AuthState from '../../states/AuthState';

export const signUp: any = (login: string, password: string, name: string, surname: string) => {
	return (dispatch: Function) => {
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
				payload: new AuthState(ResultCode.CONNECTION_ERROR)
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
				payload: new AuthState(ResultCode.CONNECTION_ERROR)
			});
		});
	};
};

export const signOut: any = () => {
	return (dispatch: Function) => {
		dispatch({
			type: ActionTypes.SIGN_OUT
		});
	};
};

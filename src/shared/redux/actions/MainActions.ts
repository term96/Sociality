import axios from 'axios';
import { ActionTypes } from './ActionTypes';

export const signUp: any = (login: string, password: string, name: string, surname: string) => {
	return async (dispatch: Function, getState: Function) => {
		const params: URLSearchParams = new URLSearchParams();
		params.append('login', login);
		params.append('password', password);
		params.append('name', name);
		params.append('surname', surname);
		const response: any = await axios.post('/api/users/signup', params);
		dispatch({
			type: ActionTypes.MAIN_SIGN_UP,
			payload: {
				...response.data
			}
		});
	};
};

import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { ResultCode } from '../../ResultCode';
import FriendsState from '../../states/FriendsState';

export const loadFriendsList: any = (token: string) => {
	return (dispatch: Function) => {
		axios.get(`/api/friends/${token}`).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.LOAD_FRIENDS_LIST,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.LOAD_FRIENDS_LIST,
				payload: new FriendsState(ResultCode.CONNECTION_ERROR)
			});
		});
	};
};

export const resetFriendsList: any = () => {
	return (dispatch: Function) => {
		dispatch({
			type: ActionTypes.RESET_FRIENDS_LIST
		});
	};
};

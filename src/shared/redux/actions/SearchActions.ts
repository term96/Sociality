import axios, { AxiosResponse } from 'axios';
import { ActionTypes } from './ActionTypes';
import { ResultCode } from '../../ResultCode';
import SearchState from '../../states/SearchState';

export const loadSearchData: any = (searchData: object, token: string) => {
	return (dispatch: Function) => {
		axios.get(`/api/search/${token}`, { params: searchData }).then((response: AxiosResponse) => {
			dispatch({
				type: ActionTypes.LOAD_SEARCH_DATA,
				payload: {
					...response.data
				}
			});
		}).catch(() => {
			dispatch({
				type: ActionTypes.LOAD_SEARCH_DATA,
				payload: new SearchState(ResultCode.CONNECTION_ERROR)
			});
		});
	};
};

export const resetSearchData: any = () => {
	return (dispatch: Function) => {
		dispatch({
			type: ActionTypes.RESET_SEARCH_DATA
		});
	};
};

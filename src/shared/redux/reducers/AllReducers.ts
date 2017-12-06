import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
	authState: AuthReducer,
	userState: UserReducer
});

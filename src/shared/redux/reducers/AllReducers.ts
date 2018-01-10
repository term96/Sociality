import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import EditReducer from './EditReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
	authState: AuthReducer,
	userState: UserReducer,
	editState: EditReducer,
	searchState: SearchReducer
});

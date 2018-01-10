import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { default as reducers } from './reducers/AllReducers';

const store: Store<any> = createStore(reducers, applyMiddleware(thunk));
export default store;

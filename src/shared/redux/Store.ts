import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { default as reducers } from './reducers/AllReducers';

interface IWindow extends Window {
	PRELOADED_STATE: any;
}

let preloadedState: object = {};

if (window !== undefined && (window as IWindow).PRELOADED_STATE) {
	preloadedState = (window as IWindow).PRELOADED_STATE;
	delete (window as IWindow).PRELOADED_STATE;
}

const store: Store<any> = createStore(reducers, applyMiddleware(thunk));
export default store;

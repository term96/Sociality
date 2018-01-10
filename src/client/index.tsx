import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/components/App';
import store from '../shared/redux/Store';
import '../shared/css/bootstrap.css';
import '../shared/css/my_styles.css';
import '../shared/css/react-datetime.css';

ReactDOM.hydrate((
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
), document.getElementById('root'));

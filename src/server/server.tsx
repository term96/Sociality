import * as express from 'express';
import * as bodyParser from 'body-parser';
import JWT from './JWT';
import DB from './DB';
import { Result } from './Result';
import UserModel from '../shared/models/UserModel';
import Const from './Const';
import reducers from '../shared/redux/reducers/AllReducers';
import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StaticRouter, matchPath, match } from 'react-router';
import routeOptions from '../shared/routes/routeOptions';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from '../shared/components/App';
import * as nodePath from 'path';
import AuthState from '../shared/models/AuthState';
import UserState from '../shared/models/UserState';

const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/assets', express.static(nodePath.resolve(__dirname, '../../public/assets')));

app.post('/api/users/sign_up', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password || !req.body.name || !req.body.surname) {
		const response: AuthState = new AuthState(Result.INVALID_BODY);
		return res.json(response);
	}

	const user: UserModel = new UserModel(undefined, req.body.login, req.body.password, req.body.name, req.body.surname);

	DB.insertUser(user, (result: Result, id?: number) => {
		const response: AuthState = (result === Result.OK)
			? new AuthState(undefined, id, JWT.sign(id))
			: new AuthState(result);
		res.json(response);
	});
});

app.post('/api/users/sign_in', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		const response: AuthState = new AuthState(Result.INVALID_BODY);
		return res.json(response);
	}

	DB.getUser(req.body.login, req.body.password, (result: Result, user?: UserModel) => {
		const response: AuthState = (result === Result.OK)
			? new AuthState(undefined, user.id, JWT.sign(user.id))
			: new AuthState(result);
		res.json(response);
	});
});

app.get('/api/users/:id', (req: express.Request, res: express.Response) => {
	const response: UserState = new UserState(undefined, req.params.id);
	res.json(response);
});

app.get('*', async (req: express.Request, res: express.Response) => {
	try {
		// create new redux store on each request
		const store: Store<any> = createStore(reducers, {}, applyMiddleware(thunk));
		let foundPath: match<any> = null;
		// match request url to our React Router paths and grab component
		let foundRoute: any;
		foundRoute = routeOptions.routes.find(
				({ path, exact }: any) => {
					foundPath = matchPath(req.url,
						{
							path,
							exact,
							strict: false
						}
					);
					return (foundPath !== undefined);
				}) || {};
		// safety check for valid component, if no component we initialize an empty shell.
		if (!foundRoute.component) {
			foundRoute.component = {};
		}
		// safety check for fetchData function, if no function we give it an empty promise
		if (!foundRoute.component.fetchData) {
			foundRoute.component.fetchData = () => new Promise((resolve: any) => resolve());
		}
		// meat and bones of our isomorphic application: grabbing async data
		await foundRoute.component.fetchData({ store });
		// get store state (js object of entire store)
		const preloadedState: object = store.getState();
		// context is used by react router, empty by default
		const context: any = {};
		const html: string = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter context={context} location={req.url}>
					<App />
				</StaticRouter>
			</Provider>
		);
		// check context for url, if url exists then react router has ran into a redirect
		if (context.url) {
			// process redirect through express by redirecting
			res.redirect(context.status as number, 'http://' + req.headers.host + context.url);
		} else if (foundPath && foundPath.path === '*') {
			// if 404 then send our custom 404 page with initial state and meta data, this is needed for status code 404
			res.status(404).send(createHtml(html, preloadedState));
		} else {
			// else send down page with initial state and meta data
			res.send(createHtml(html, preloadedState));
		}
	} catch (error) {
		res.status(500).send(createHtml(`<span>Internal server error</span>`, {}));
	}
});

const createHtml: Function = (html: string, preloadedState: object) => {
	return (`
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Sociality</title>
			<link rel="stylesheet" href="/assets/styles.css">
		</head>
		<body>
			<div id="root">${html}</div>
			<script>
				window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
			</script>
			<script src="/assets/bundle.js"></script>
		</body>
	</html>
	`);
};

const port: string = Const.serverPort;

app.listen(port);

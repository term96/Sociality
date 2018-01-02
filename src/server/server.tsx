import * as express from 'express';
import * as bodyParser from 'body-parser';
import JWT from './JWT';
import DB from './DB';
import { Result } from '../shared/Result';
import UserModel from './models/UserModel';
import Const from '../shared/Const';
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
import AuthInfo from '../shared/models/AuthInfo';
import UserState from '../shared/states/UserState';

const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/assets', express.static(nodePath.resolve(__dirname, '../../public/assets')));

app.post('/api/users/sign_up', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password || !req.body.name || !req.body.surname) {
		const response: AuthInfo = new AuthInfo(Result.INVALID_BODY);
		return res.json(response);
	}

	const user: UserModel = new UserModel(undefined, req.body.login, req.body.password, req.body.name, req.body.surname);

	DB.insertUser(user, (result: Result, id?: number) => {
		const response: AuthInfo = (result === Result.OK)
			? new AuthInfo(undefined, id, JWT.sign(id))
			: new AuthInfo(result);
		res.json(response);
	});
});

app.post('/api/users/sign_in', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		const response: AuthInfo = new AuthInfo(Result.INVALID_BODY);
		return res.json(response);
	}

	DB.getUser(req.body.login, req.body.password, (result: Result, user?: UserModel) => {
		const response: AuthInfo = (result === Result.OK)
			? new AuthInfo(undefined, user.id, JWT.sign(user.id))
			: new AuthInfo(result);
		res.json(response);
	});
});

app.get('/api/users/:id', (req: express.Request, res: express.Response) => {
	const response: UserState = new UserState(undefined, req.params.id);
	res.json(response);
});

app.get('*', async (req: express.Request, res: express.Response) => {
	try {
		const store: Store<any> = createStore(reducers, {}, applyMiddleware(thunk));
		let foundPath: match<any> = null;
		routeOptions.routes.find(
				({ path, exact }: any) => {
					foundPath = matchPath(req.url,
						{
							path,
							exact,
							strict: false
						}
					);
					return (foundPath !== undefined);
				});

		const context: any = {};
		const html: string = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter context={context} location={req.url}>
					<App />
				</StaticRouter>
			</Provider>
		);

		if (context.url) {
			res.redirect(302, 'http://' + req.headers.host + context.url);
		} else if (foundPath && foundPath.path === '*') {
			res.status(404).send(createHtml(html));
		} else {
			res.send(createHtml(html));
		}
	} catch (error) {
		res.status(500).send(createHtml(`<div><span>${ error }</span></div>`));
	}
});

const createHtml: Function = (html: string) => {
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
			<script src="/assets/bundle.js"></script>
		</body>
	</html>
	`);
};

const port: number = Const.serverPort;
app.listen(port);

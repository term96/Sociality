import * as express from 'express';
import * as bodyParser from 'body-parser';
import JWT from './JWT';
import DB from './DB';
import { ResultCode } from '../shared/ResultCode';
import User from '../shared/models/User';
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
import AuthState from '../shared/states/AuthState';
import UserState from '../shared/states/UserState';
import EditState from '../shared/states/EditState';

const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/assets', express.static(nodePath.resolve(__dirname, '../../public/assets')));

app.post('/api/users/sign_up', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password || !req.body.name || !req.body.surname) {
		const response: AuthState = new AuthState(ResultCode.INVALID_BODY);
		return res.json(response);
	}

	const user: User = new User(undefined, req.body.login, req.body.password, req.body.name, req.body.surname);

	DB.insertUser(user, (result: ResultCode, id?: number) => {
		const response: AuthState = (result === ResultCode.OK)
			? new AuthState(result, id, JWT.sign(id))
			: new AuthState(result);
		res.json(response);
	});
});

app.post('/api/users/sign_in', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		const response: AuthState = new AuthState(ResultCode.INVALID_BODY);
		return res.json(response);
	}

	DB.getUserId(req.body.login, req.body.password, (result: ResultCode, id?: number) => {
		const response: AuthState = (result === ResultCode.OK)
			? new AuthState(result, id, JWT.sign(id))
			: new AuthState(result);
		res.json(response);
	});
});

app.get('/api/users/:id/:token', (req: express.Request, res: express.Response) => {
	const userId: number = JWT.decodeId(req.params.token);
	if (userId === undefined) {
		res.json(new UserState(ResultCode.TOKEN_REQUIRED));
		return;
	}

	DB.getUserById(req.params.id, (result: ResultCode, user?: User) => {
		const response: UserState = (result === ResultCode.OK)
			? new UserState(result, user.id, user.name, user.surname, user.city, user.birthday, user.about, user.avatarPath)
			: new UserState(result);
		res.json(response);
	});
});

app.get('/api/edit/:token', (req: express.Request, res: express.Response) => {
	const userId: number = JWT.decodeId(req.params.token);
	if (userId === undefined) {
		res.json(new EditState(ResultCode.TOKEN_REQUIRED));
		return;
	}

	DB.getUserById(userId, (result: ResultCode, user?: User) => {
		const response: EditState = (result === ResultCode.OK)
			? new EditState(result, user.login, user.name, user.surname, user.city, user.birthday, user.about, user.avatarPath)
			: new EditState(result);
		res.json(response);
	});
});

app.put('/api/edit/info/:token', (req: express.Request, res: express.Response) => {
	const userId: number = JWT.decodeId(req.params.token);
	if (userId === undefined) {
		return res.json(new EditState(ResultCode.TOKEN_REQUIRED));
	}

	if (!req.body || !req.body.name || !req.body.surname) {
		return res.json(new EditState(ResultCode.INVALID_BODY));
	}

	const newData: User = new User(
		userId, undefined, undefined, req.body.name, req.body.surname, req.body.city, req.body.birthday, req.body.about
	);

	DB.editUserInfo(newData, (result: ResultCode) => {
		res.json(new EditState(result));
	});
});

app.get('*', (req: express.Request, res: express.Response) => {
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

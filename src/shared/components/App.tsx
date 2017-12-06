import * as React from 'react';
import routerOptions from '../routes/routeOptions';
import { Route, Switch } from 'react-router-dom';
import * as Col from 'react-bootstrap/lib/Col';
import Header from './Header';

export default class App extends React.Component<{}, {}> {
	render(): JSX.Element {
		const routes: JSX.Element[] = routerOptions.routes.map(({ path, component, exact }: any) => {
			return <Route key={path} exact={exact} path={path} component={component}/>;
		});
		return (
			<div>
				<Header />
				<Col sm={8} smOffset={2}>
					<Switch>
						{routes}
					</Switch>
				</Col>
			</div>
		);
	}
};

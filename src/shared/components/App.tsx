import * as React from 'react';
import routerOptions from '../routes/routeOptions';
import { Route, Switch } from 'react-router-dom';

export default class App extends React.Component<{}, {}> {
	render(): JSX.Element {
		const routes: JSX.Element[] = routerOptions.routes.map(({ path, component, exact }: any) => {
			return <Route key={path} exact={exact} path={path} component={component} />;
		});
		return (
			<div>
				<Switch>
					{routes}
				</Switch>
			</div>
		);
	}
}

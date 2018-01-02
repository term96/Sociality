import * as React from 'react';
import { Link } from 'react-router-dom';
import PageRoutes from '../routes/PageRoutes';

export default class NotFoundPage extends React.PureComponent {
	render(): JSX.Element {
		return (
			<div>
				<h1>Страница не найдена</h1>
				<Link to={PageRoutes.main}>На главную страницу</Link>
			</div>
		);
	}
}

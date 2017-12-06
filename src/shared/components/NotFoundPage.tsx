import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.PureComponent {
	render(): JSX.Element {
		return (
			<div>
				<h1>Страница не найдена</h1>
				<Link to='/'>На главную страницу</Link>
			</div>
		);
	}
}

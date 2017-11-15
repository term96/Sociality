import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.Component<{}, {}> {
	render(): JSX.Element {
		return (
			<div>
				<h1>
					404 - Not found
				</h1>
				<Link to='/'>Go to main page</Link>
			</div>
		);
	}
}

import * as React from 'react';
import { Link } from 'react-router-dom';

export default class MainPage extends React.Component<{}, {}> {
	render(): JSX.Element {
		return (
			<div>
				<h1>
					Welcome to main page!
				</h1>
				<Link to='/user'>User page</Link>
			</div>
		);
	}
}

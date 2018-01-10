import * as React from 'react';
import * as Alert from 'react-bootstrap/lib/Alert';

export default class LoadingAlert extends React.PureComponent {
	render(): JSX.Element {
		return (
			<Alert bsStyle='info'>
				Загрузка данных...
			</Alert>
		);
	}
}

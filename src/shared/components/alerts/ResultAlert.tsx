import * as React from 'react';
import * as Alert from 'react-bootstrap/lib/Alert';
import MessageProvider from '../../MessageProvider';
import { ResultCode } from '../../ResultCode';

interface IResultAlertProps extends React.ClassAttributes<ResultAlert> {
	resultCode: number;
}

export default class ResultAlert extends React.Component<IResultAlertProps> {
	constructor(props: IResultAlertProps) {
		super(props);
	}

	render(): JSX.Element {
		const props: IResultAlertProps = this.props;
		const style: string = (props.resultCode === ResultCode.OK) ? 'success' : 'danger';
		return (
			<Alert bsStyle={style}>
				{MessageProvider.getMessage(props.resultCode)}
			</Alert>
		);
	}
}

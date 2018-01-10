import * as React from 'react';
import * as Alert from 'react-bootstrap/lib/Alert';
import MessageProvider from '../../MessageProvider';
import { ResultCode } from '../../ResultCode';

interface IInfoAlertProps extends React.ClassAttributes<InfoAlert> {
	resultCode?: number;
	message?: string;
	type?: string;
}

export default class InfoAlert extends React.Component<IInfoAlertProps> {
	constructor(props: IInfoAlertProps) {
		super(props);
	}

	render(): JSX.Element {
		const props: IInfoAlertProps = this.props;

		if (props.resultCode === undefined && props.message === undefined) {
			return null;
		}

		const style: string = (props.resultCode !== undefined)
			? (props.resultCode === ResultCode.OK) ? 'success' : 'danger'
			: props.type;

		const message: string = (props.resultCode !== undefined)
			? MessageProvider.getMessage(props.resultCode)
			: props.message;

		return (
			<Alert bsStyle={style}>{message}</Alert>
		);
	}
}

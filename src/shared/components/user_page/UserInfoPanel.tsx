import * as React from 'react';
import UserState from '../../states/UserState';
import MessageProvider from '../../MessageProvider';
import * as Col from 'react-bootstrap/lib/Col';
import * as Image from 'react-bootstrap/lib/Image';

export interface IUserInfoPanelProps {
	userState: UserState;
}

export default class UserInfoPanel extends React.Component<IUserInfoPanelProps, {}> {
	render(): JSX.Element {
		const props: IUserInfoPanelProps = this.props;

		if (props.userState.errorNumber) {
			return (
				<div>
					<span>{MessageProvider.getMessage(props.userState.errorNumber)}</span>
				</div>
			);
		}

		const avatarPath: string = `/${props.userState.avatarPath}`;
		const name: JSX.Element = <h3 className='no-top-margin'>{props.userState.name} {props.userState.surname}</h3>;
		const city: JSX.Element = (props.userState.city) ? <p>Город: {props.userState.city}</p> : null;
		const birthday: JSX.Element = (props.userState.birthday)
			? <p>День рождения: {new Date(props.userState.birthday).toLocaleDateString()}</p>
			: null;
		const about: JSX.Element = (props.userState.about) ? <p>О себе: {props.userState.about}</p> : null;

		return (
			<div>
				<Col sm={3}>
					<Image className='full-width' src={avatarPath} rounded responsive />
				</Col>
				<Col sm={9}>
					{name}
					{city}
					{birthday}
					{about}
				</Col>
			</div>
		);
	}
}

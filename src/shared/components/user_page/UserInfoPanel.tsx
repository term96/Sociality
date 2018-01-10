import * as React from 'react';
import UserState from '../../states/UserState';
import * as Col from 'react-bootstrap/lib/Col';
import * as Image from 'react-bootstrap/lib/Image';
import * as Row from 'react-bootstrap/lib/Row';

interface IUserInfoPanelProps extends React.ClassAttributes<UserInfoPanel> {
	userState: UserState;
}

export default class UserInfoPanel extends React.Component<IUserInfoPanelProps, {}> {
	render(): JSX.Element {
		const props: IUserInfoPanelProps = this.props;
		const avatarPath: string = `/images/${props.userState.avatarPath}`;
		const name: JSX.Element = <h3 className='no-top-margin'>{props.userState.name} {props.userState.surname}</h3>;
		const city: JSX.Element = (props.userState.city) ? <p>Город: {props.userState.city}</p> : null;
		const birthday: JSX.Element = (props.userState.birthday)
			? <p>День рождения: {new Date(props.userState.birthday).toLocaleDateString()}</p>
			: null;
		const about: JSX.Element = (props.userState.about) ? <p>О себе: {props.userState.about}</p> : null;

		return (
			<Row>
				<Col sm={4}>
					<Image className='full-width' src={avatarPath} rounded responsive />
				</Col>
				<Col sm={8}>
					{name}
					{city}
					{birthday}
					{about}
				</Col>
			</Row>
		);
	}
}

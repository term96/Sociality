import * as React from 'react';
import User from '../models/User';
import * as Col from 'react-bootstrap/lib/Col';
import * as Row from 'react-bootstrap/lib/Row';
import * as Image from 'react-bootstrap/lib/Image';
import { Link } from 'react-router-dom';
import PageRoutes from '../routes/PageRoutes';

interface IShortUserInfoProps extends React.ClassAttributes<ShortUserInfo> {
	user: User;
}

export default class ShortUserInfo extends React.Component<IShortUserInfoProps> {
	render(): JSX.Element {
		const props: IShortUserInfoProps = this.props as IShortUserInfoProps;
		const user: User = props.user;
		const name: JSX.Element =
			<h3 className='no-top-margin'>
				<Link to={`${PageRoutes.user}/${user.id}`}>{user.name} {user.surname}</Link>
			</h3>;
		const city: JSX.Element = (user.city) ? <p>Город: {user.city}</p> : null;
		const birthday: JSX.Element = (user.birthday)
			? <p>День рождения: {new Date(user.birthday).toLocaleDateString()}</p>
			: null;
		return (
			<Row>
				<Col sm={4}>
					<Image className='full-width' src={user.avatarPath} rounded responsive/>
				</Col>
				<Col sm={8}>
					{name}
					{city}
					{birthday}
				</Col>
			</Row>
		);
	}
}

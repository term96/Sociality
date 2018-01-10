import * as React from 'react';
import * as ListGroup from 'react-bootstrap/lib/ListGroup';
import { ResultCode } from '../../ResultCode';
import InfoAlert from '../alerts/InfoAlert';
import ShortUserInfo from '../ShortUserInfo';
import User from '../../models/User';
import FriendsState from '../../states/FriendsState';

interface IFriendsListProps extends React.ClassAttributes<FriendsList> {
	friendsState: FriendsState;
}

export default class FriendsList extends React.Component<IFriendsListProps> {
	render(): JSX.Element {
		const props: IFriendsListProps = this.props;

		if (props.friendsState.resultCode === ResultCode.OK && props.friendsState.users.length === 0) {
			return <InfoAlert message='Список пуст' type='info'/>;
		}

		const alert: JSX.Element = (props.friendsState.resultCode !== ResultCode.OK)
			? <InfoAlert resultCode={props.friendsState.resultCode}/>
			: null;

		const listItems: any = props.friendsState.users.map((user: User) => {
			return <li key={user.id} className='list-group-item'><ShortUserInfo user={user}/></li>;
		});

		return (
			<div>
				<ListGroup componentClass='ul'>
					{...listItems}
				</ListGroup>
				{alert}
			</div>
		);
	}
}

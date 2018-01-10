import * as React from 'react';
import SearchState from '../../states/SearchState';
import * as ListGroup from 'react-bootstrap/lib/ListGroup';
import { ResultCode } from '../../ResultCode';
import InfoAlert from '../alerts/InfoAlert';
import ShortUserInfo from '../ShortUserInfo';
import User from '../../models/User';
import * as Button from 'react-bootstrap/lib/Button';

interface IUsersListProps extends React.ClassAttributes<UsersList> {
	searchState: SearchState;
	loadMore: () => void;
}

interface IUsersListState {
	itemCount: number;
	showButton: boolean;
}

export default class UsersList extends React.Component<IUsersListProps, IUsersListState> {
	constructor(props: IUsersListProps) {
		super(props);
		this.state = {
			itemCount: undefined,
			showButton: true
		};
	}

	componentWillReceiveProps(props: IUsersListProps): void {
		const state: IUsersListState = this.state as IUsersListState;
		const showButton: boolean = props.searchState.users.length !== state.itemCount;
		this.setState(() => {
			return {
				itemCount: props.searchState.users.length,
				showButton: showButton
			};
		});
	}

	render(): JSX.Element {
		const props: IUsersListProps = this.props;
		const state: IUsersListState = this.state as IUsersListState;

		if (props.searchState.resultCode === ResultCode.OK && props.searchState.users.length === 0) {
			return <InfoAlert message='Ничего не найдено' type='info'/>;
		}

		const alert: JSX.Element = (props.searchState.resultCode !== ResultCode.OK)
			? <InfoAlert resultCode={props.searchState.resultCode}/>
			: null;

		const listItems: any = props.searchState.users.map((user: User) => {
			return <li key={user.id} className='list-group-item'><ShortUserInfo user={user}/></li>;
		});

		const button: JSX.Element = (state.showButton && alert === null)
			? <Button className='full-width' onClick={props.loadMore}>Загрузить ещё</Button>
			: null;

		return (
			<div>
				<ListGroup componentClass='ul'>
					{...listItems}
				</ListGroup>
				{alert}
				{button}
			</div>
		);
	}
}

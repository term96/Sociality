import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { ResultCode } from '../../ResultCode';
import * as Button from 'react-bootstrap/lib/Button';
import InfoAlert from '../alerts/InfoAlert';

interface IFriendButtonProps extends React.ClassAttributes<FriendButton> {
	id: number;
	token: string;
}

interface IFriendButtonState {
	showButton: boolean;
	resultCode: ResultCode;
	friend: boolean;
}

export default class FriendButton extends React.Component<IFriendButtonProps, IFriendButtonState> {
	constructor(props: IFriendButtonProps) {
		super(props);
		this.state = {
			showButton: false,
			resultCode: undefined,
			friend: undefined
		};
		this.addFriend = this.addFriend.bind(this);
		this.deleteFriend = this.deleteFriend.bind(this);
	}

	componentDidMount(): void {
		const props: IFriendButtonProps = this.props;
		axios.get(`/api/friends/check/${props.token}`, { params: { friendId: props.id } }).then((response: AxiosResponse) => {
			this.setState(() => {
				return {
					showButton: response.data.resultCode === ResultCode.OK,
					resultCode: undefined,
					friend: response.data.friend
				};
			});
		}).catch(() => {
			this.setState(() => {
				return {
					showButton: false,
					resultCode: undefined,
					friend: undefined
				};
			});
		});
	}

	addFriend(): void {
		const props: IFriendButtonProps = this.props;
		axios.post(`/api/friends/add/${props.token}`, { friendId: props.id }).then((response: AxiosResponse) => {
			this.setState((prevState: IFriendButtonState) => {
				return {
					...prevState,
					resultCode: response.data.resultCode,
					friend: (response.data.resultCode === ResultCode.OK)
						? true
						: prevState.friend
				};
			});
		}).catch(() => {
			this.setState((prevState: IFriendButtonState) => {
				return {
					...prevState,
					resultCode: ResultCode.CONNECTION_ERROR
				};
			});
		});
	}

	deleteFriend(): void {
		const props: IFriendButtonProps = this.props;
		axios.post(`/api/friends/delete/${props.token}`, { friendId: props.id }).then((response: AxiosResponse) => {
			this.setState((prevState: IFriendButtonState) => {
				return {
					...prevState,
					resultCode: response.data.resultCode,
					friend: (response.data.resultCode === ResultCode.OK)
						? false
						: prevState.friend
				};
			});
		}).catch(() => {
			this.setState((prevState: IFriendButtonState) => {
				return {
					...prevState,
					resultCode: ResultCode.CONNECTION_ERROR
				};
			});
		});
	}

	render(): JSX.Element {
		const state: IFriendButtonState = this.state as IFriendButtonState;

		const text: string = (state.friend) ? 'Удалить из друзей' : 'Добавить в друзья';
		const onClick: () => void = (state.friend) ? this.deleteFriend : this.addFriend;
		const button: JSX.Element = (state.showButton)
			? <Button bsStyle='primary' onClick={onClick}>{text}</Button>
			: null;

		const errorAlert: JSX.Element = (state.resultCode !== undefined && state.resultCode !== ResultCode.OK)
			? <InfoAlert message='Ошибка' type='danger' />
			: null;

		return (
			<div>
				{button}
				{errorAlert}
			</div>
		);
	}
}

import * as React from 'react';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as ModalHeader from 'react-bootstrap/lib/ModalHeader';
import * as ModalTitle from 'react-bootstrap/lib/ModalTitle';
import * as ModalBody from 'react-bootstrap/lib/ModalBody';
import * as ModalFooter from 'react-bootstrap/lib/ModalFooter';
import * as Button from 'react-bootstrap/lib/Button';
import axios, { AxiosResponse } from 'axios';
import { ResultCode } from '../../ResultCode';
import FriendsState from '../../states/FriendsState';
import User from '../../models/User';
import * as ListGroup from 'react-bootstrap/lib/ListGroup';
import InfoModal from './InfoModal';
import MessageProvider from '../../MessageProvider';

interface IProps extends React.ClassAttributes<InvitationModal> {
	onHide: () => void;
	show: boolean;
	conversationId: number;
	token: string;
	friendsState: FriendsState;
}

interface IState {
	showResult: false;
	resultCode: ResultCode;
}

export default class InvitationModal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			resultCode: undefined,
			showResult: false
		};
		this.hideError = this.hideError.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e: React.MouseEvent<HTMLLIElement>): void {
		const id: number = (e.target as HTMLLIElement).value;
		const props: IProps = this.props;
		const data: {} = {
			conversationId: props.conversationId,
			id: id
		};

		axios.post(`/api/conversations/invite/${props.token}`, data)
			.then((response: AxiosResponse) => {
				this.setState((prevState: IState) => {
					return {
						...prevState,
						resultCode: response.data.resultCode,
						showResult: true
					};
				});
			}).catch(() => {
			this.setState((prevState: IState) => {
				return {
					...prevState,
					resultCode: ResultCode.CONNECTION_ERROR,
					showResult: true
				};
			});
		});
	}

	hideError(): void {
		this.setState((prevState: IState) => {
			return {
				...prevState,
				showResult: false
			};
		});
		const props: IProps = this.props;
		props.onHide();
	}

	render(): JSX.Element {
		const props: IProps = this.props;
		const state: IState = this.state as IState;

		const friends: JSX.Element[] = props.friendsState.users.map((value: User) => {
			return (
				<li key={value.id} className='list-group-item' onClick={this.onClick} value={value.id}>
					{value.name} {value.surname}
				</li>
			);
		});

		const error: JSX.Element = (state.resultCode !== ResultCode.OK && state.showResult)
			? <InfoModal
				onHide={this.hideError}
				title='Результат'
				message={MessageProvider.getMessage(state.resultCode)}
				show={state.showResult}
			/>
			: null;

		return (
			<Modal show={props.show} onHide={props.onHide}>
				<ModalHeader closeButton>
					<ModalTitle>Кликните на друга, которого хотите пригласить</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<ListGroup componentClass='ul'>
						{...friends}
					</ListGroup>
				</ModalBody>
				<ModalFooter>
					<Button onClick={props.onHide}>Закрыть</Button>
				</ModalFooter>
				{error}
			</Modal>
		);
	}
}

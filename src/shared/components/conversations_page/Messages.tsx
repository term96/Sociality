import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { ResultCode } from '../../ResultCode';
import Conversation from '../../models/Conversation';
import Message from '../../models/Message';
import * as ListGroup from 'react-bootstrap/lib/ListGroup';
import MessageProvider from '../../MessageProvider';
import InfoModal from './InfoModal';
import * as Button from 'react-bootstrap/lib/Button';
import * as Panel from 'react-bootstrap/lib/Panel';
import * as PanelHeading from 'react-bootstrap/lib/PanelHeading';
import * as PanelBody from 'react-bootstrap/lib/PanelBody';
import * as PanelTitle from 'react-bootstrap/lib/PanelTitle';
import * as conversationsActions from '../../redux/actions/ConversationsActions';
import * as friendsActions from '../../redux/actions/FriendsActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageInfo from './MessageInfo';
import AuthState from '../../states/AuthState';
import ConversationsState from '../../states/ConversationsState';
import AppState from '../../redux/AppState';
import FriendsState from '../../states/FriendsState';
import * as Row from 'react-bootstrap/lib/Row';
import * as Col from 'react-bootstrap/lib/Col';
import InvitationModal from './InvitationModal';

interface IMessagesProps extends React.ClassAttributes<Messages> {
	conversation: number;
	conversationsState?: ConversationsState;
	friendsState?: FriendsState;
	authState?: AuthState;
	loadMessages?: (conversationId: number, oldest: number, token: string) => void;
	resetMessages?: () => void;
	resetFriendsList?: () => void;
	loadFriendsList?: (token: string) => void;
}

interface IMessagesState {
	resultCode?: number;
	showError: boolean;
	message: string;
	showInvitation: boolean;
}

class Messages extends React.Component<IMessagesProps, IMessagesState> {
	constructor(props: IMessagesProps) {
		super(props);
		this.state = {
			resultCode: undefined,
			showError: false,
			message: '',
			showInvitation: false
		};
		this.onHide = this.onHide.bind(this);
		this.onChange = this.onChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.addUser = this.addUser.bind(this);
	}

	componentDidMount(): void {
		const props: IMessagesProps = this.props;
		const conversation: Conversation = props.conversationsState.conversations[props.conversation];
		props.resetFriendsList();
		props.loadFriendsList(props.authState.token);
		props.loadMessages(conversation.id, undefined, props.authState.token);
	}

	componentDidUpdate(prevProps: IMessagesProps): void {
		const props: IMessagesProps = this.props;
		const conversation: Conversation = props.conversationsState.conversations[props.conversation];
		if (prevProps.conversation !== props.conversation) {
			props.resetMessages();
			props.loadMessages(conversation.id, undefined, props.authState.token);
		}
	}

	onHide(): void {
		this.setState((prevState: IMessagesState) => {
			return {
				...prevState,
				showError: false,
				showInvitation: false
			};
		});
	}

	onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		const value: string = (e.target as HTMLTextAreaElement).value;
		this.setState((prevState: IMessagesState) => {
			return {
				...prevState,
				message: value
			};
		});
	}

	loadMore(): void {
		const props: IMessagesProps = this.props;
		const conversation: Conversation = props.conversationsState.conversations[props.conversation];
		props.loadMessages(conversation.id, conversation.messages[0].id, props.authState.token);
	}

	addUser(): void {
		this.setState((prevState: IMessagesState) => {
			return {
				...prevState,
				showInvitation: true
			};
		});
	}

	render(): JSX.Element {
		const props: IMessagesProps = this.props;
		const state: IMessagesState = this.state as IMessagesState;
		const conversation: Conversation = props.conversationsState.conversations[props.conversation];
		const messages: JSX.Element[] = conversation.messages.map((value: Message) => {
			return (
				<li key={value.id} className='list-group-item'>
					<MessageInfo message={value} userId={props.authState.id}/>
				</li>
			);
		});

		const errorModal: JSX.Element = (state.resultCode !== ResultCode.OK && state.showError)
			? <InfoModal
				title='Ошибка'
				message={MessageProvider.getMessage(state.resultCode)}
				show={true}
				onHide={this.onHide}/>
			: null;

		const invitation: JSX.Element = (state.showInvitation)
			? <InvitationModal
				onHide={this.onHide}
				show={state.showInvitation}
				conversationId={conversation.id}
				token={props.authState.token}
				friendsState={props.friendsState}
			/>
			: null;

		return (
			<Panel>
				<PanelHeading><PanelTitle>{conversation.name}</PanelTitle></PanelHeading>
				<PanelBody>
					<Row>
						<Col sm={6}>
							<Button
								onClick={this.loadMore}
								className='full-width'
								disabled={!conversation.messages.length}>
								Загрузить ещё
							</Button>
						</Col>
						<Col sm={6}>
							<Button
								onClick={this.addUser}
								className='full-width'>
								Добавить собеседника
							</Button>
						</Col>
					</Row>
					<ListGroup componentClass='ul'>
						{messages}
					</ListGroup>
					<textarea onChange={this.onChange} className='full-width' value={state.message}/>
					<Button onClick={this.sendMessage} disabled={state.message.length === 0}>Отправить</Button>
				</PanelBody>
				{invitation}
				{errorModal}
			</Panel>
		);
	}

	sendMessage(): void {
		const props: IMessagesProps = this.props;
		const state: IMessagesState = this.state as IMessagesState;
		const conversation: Conversation = props.conversationsState.conversations[props.conversation];
		const data: {} = {
			text: state.message,
			time: Date.now()
		};
		axios.post(`/api/conversations/${conversation.id}/${props.authState.token}`, data)
			.then((response: AxiosResponse) => {
				this.setState((prevState: IMessagesState) => {
					return {
						...prevState,
						resultCode: response.data.resultCode,
						message: (response.data.resultCode === ResultCode.OK) ? '' : prevState.message,
						showError: true
					};
				});
			}).catch(() => {
			this.setState((prevState: IMessagesState) => {
				return {
					...prevState,
					resultCode: ResultCode.CONNECTION_ERROR,
					showError: true
				};
			});
		});
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState,
		friendsState: state.friendsState,
		conversationsState: state.conversationsState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators({ ...conversationsActions, ...friendsActions } as any, dispatch);
};

export default connect<{}, {}, IMessagesProps>(mapStateToProps, mapDispatchToProps)(Messages);

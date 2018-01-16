import * as React from 'react';
import AuthState from '../../states/AuthState';
import ConversationsState from '../../states/ConversationsState';
import axios, { AxiosResponse } from 'axios';
import { ResultCode } from '../../ResultCode';
import AppState from '../../redux/AppState';
import * as conversationsActions from '../../redux/actions/ConversationsActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConversationsList from './ConversationsList';
import * as Button from 'react-bootstrap/lib/Button';
import NewConversationModal from './NewConversationModal';
import LoadingAlert from '../alerts/LoadingAlert';
import * as Col from 'react-bootstrap/lib/Col';
import Conversation from '../../models/Conversation';
import Messages from './Messages';

interface IConversationPageProps extends React.ClassAttributes<ConversationsPage> {
	authState: AuthState;
	conversationsState: ConversationsState;
	loadConversations: (token: string) => void;
	resetConversations: () => void;
}

interface IConversationsPageState {
	resultCode?: ResultCode;
	showCreateModal?: boolean;
	chosenConversation: number;
}

class ConversationsPage extends React.Component<IConversationPageProps, IConversationsPageState> {
	constructor(props: IConversationPageProps) {
		super(props);
		this.state = {
			resultCode: undefined,
			showCreateModal: false,
			chosenConversation: undefined
		};

		this.createNewConversation = this.createNewConversation.bind(this);
		this.onCreateClicked = this.onCreateClicked.bind(this);
		this.onCreateModalHide = this.onCreateModalHide.bind(this);
		this.onItemClick = this.onItemClick.bind(this);
	}

	componentDidMount(): void {
		const props: IConversationPageProps = this.props;
		props.resetConversations();
		props.loadConversations(props.authState.token);
	}

	createNewConversation(name: string): void {
		const props: IConversationPageProps = this.props;
		this.onCreateModalHide();
		axios.post(`/api/conversations/create/${props.authState.token}`, { name: name })
			.then(() => {
				this.setState((prevState: IConversationsPageState) => {
					return {
						...prevState,
						chosenConversation: undefined
					};
				});
				props.resetConversations();
				props.loadConversations(props.authState.token);
			})
			.catch(() => {
				this.setState((prevState: IConversationsPageState) => {
					return {
						...prevState,
						resultCode: ResultCode.CONNECTION_ERROR
					};
				});
			});
	}

	onCreateClicked(): void {
		this.setState((prevState: IConversationsPageState) => {
			return {
				...prevState,
				showCreateModal: true
			};
		});
	}

	onCreateModalHide(): void {
		this.setState((prevState: IConversationsPageState) => {
			return {
				...prevState,
				showCreateModal: false
			};
		});
	}

	onItemClick(conversationId: number): void {
		this.setState((prevState: IConversationsPageState) => {
			return {
				...prevState,
				chosenConversation: conversationId
			};
		});
	}

	render(): JSX.Element {
		const props: IConversationPageProps = this.props;
		const state: IConversationsPageState = this.state as IConversationsPageState;

		if (props.conversationsState.resultCode === undefined) {
			return <LoadingAlert />;
		}

		const messages: JSX.Element = (state.chosenConversation !== undefined)
			? <Col sm={9}><Messages conversation={state.chosenConversation} /></Col>
			: null;

		return (
			<div>
				<NewConversationModal
					show={state.showCreateModal}
					onSubmit={this.createNewConversation}
					onHide={this.onCreateModalHide}
				/>
				<Col sm={3}>
					<Button onClick={this.onCreateClicked}>Создать беседу</Button>
					<ConversationsList conversationsState={props.conversationsState} onClick={this.onItemClick}/>
				</Col>
				{messages}
			</div>
		);
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState,
		conversationsState: state.conversationsState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(conversationsActions, dispatch);
};

export default connect<{}, {}, IConversationPageProps>(mapStateToProps, mapDispatchToProps)(ConversationsPage);

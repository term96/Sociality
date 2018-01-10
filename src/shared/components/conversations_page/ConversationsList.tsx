import * as React from 'react';
import ConversationsState from '../../states/ConversationsState';
import * as ListGroup from 'react-bootstrap/lib/ListGroup';
import Conversation from '../../models/Conversation';

interface IConversationsListProps extends React.ClassAttributes<ConversationsList> {
	conversationsState: ConversationsState;
	onClick?: (conversation: Conversation) => void;
}

export default class ConversationsList extends React.Component<IConversationsListProps> {
	constructor(props: IConversationsListProps) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(e: React.MouseEvent<HTMLLIElement>): void {
		return;
	}

	render(): JSX.Element {
		const props: IConversationsListProps = this.props;
		const list: JSX.Element[] = props.conversationsState.conversations.map((value: Conversation) => {
			return <li className='list-group-item' key={value.id} onClick={this.onClick}>{value.name}</li>;
		});

		return (
			<ListGroup componentClass='ul'>
				{list}
			</ListGroup>
		);
	}
}

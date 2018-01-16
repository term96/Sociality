import * as React from 'react';
import Message from '../../models/Message';
import * as Media from 'react-bootstrap/lib/Media';
import * as MediaLeft from 'react-bootstrap/lib/MediaLeft';
import * as Image from 'react-bootstrap/lib/Image';
import * as MediaHeading from 'react-bootstrap/lib/MediaHeading';
import * as MediaBody from 'react-bootstrap/lib/MediaBody';
import { Link } from 'react-router-dom';
import * as MediaRight from 'react-bootstrap/lib/MediaRight';

interface IMessageInfoProps extends React.ClassAttributes<MessageInfo> {
	message: Message;
	userId: number;
}

export default class MessageInfo extends React.Component<IMessageInfoProps> {
	render(): JSX.Element {
		const props: IMessageInfoProps = this.props;
		const src: string = `/images/${props.message.senderAvatarPath}`;
		const name: string = props.message.senderName;
		const link: string = `/users/${props.message.senderId}`;
		const heading: JSX.Element = <Link to={link}>{name}</Link>;
		const datetime: Date = new Date(props.message.time);
		const time: string = datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString();
		const text: string = props.message.text;
		return (
			<Media>
				<MediaLeft><Image rounded className='avatar-small' src={src} /></MediaLeft>
				<MediaBody>
					<MediaHeading>
						{heading}
					</MediaHeading>
					<h5>{time}</h5>
					<p>{text}</p>
				</MediaBody>
			</Media>
		);
	}
}

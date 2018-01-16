import * as React from 'react';
import * as ModalHeader from 'react-bootstrap/lib/ModalHeader';
import * as ModalTitle from 'react-bootstrap/lib/ModalTitle';
import * as Button from 'react-bootstrap/lib/Button';
import * as ModalFooter from 'react-bootstrap/lib/ModalFooter';
import * as ModalBody from 'react-bootstrap/lib/ModalBody';
import * as Modal from 'react-bootstrap/lib/Modal';

interface IInfoModalProps extends React.ClassAttributes<InfoModal> {
	message: string;
	title: string;
	show: boolean;
	onHide: () => void;
}

export default class InfoModal extends React.Component<IInfoModalProps> {
	render(): JSX.Element {
		const props: IInfoModalProps = this.props;
		return (
			<Modal show={props.show} onHide={props.onHide}>
				<ModalHeader closeButton>
					<ModalTitle>{props.title}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<p>{props.message}</p>
				</ModalBody>
				<ModalFooter>
					<Button onClick={props.onHide}>Закрыть</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

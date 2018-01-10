import * as React from 'react';
import * as Modal from 'react-bootstrap/lib/Modal';
import * as ModalHeader from 'react-bootstrap/lib/ModalHeader';
import * as ModalTitle from 'react-bootstrap/lib/ModalTitle';
import * as ModalBody from 'react-bootstrap/lib/ModalBody';
import * as ModalFooter from 'react-bootstrap/lib/ModalFooter';
import * as Button from 'react-bootstrap/lib/Button';

interface IProps extends React.ClassAttributes<NewConversationModal> {
	onSubmit: (name: string) => void;
	onHide: () => void;
	show: boolean;
}

interface IState {
	name: string;
	disabled: boolean;
}

export default class NewConversationModal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			name: '',
			disabled: true
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e: React.FormEvent<HTMLInputElement>): void {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState(() => {
			return {
				name: value,
				disabled: value.length === 0
			};
		});
	}

	onSubmit(): void {
		const state: IState = this.state as IState;
		const props: IProps = this.props;
		props.onSubmit(state.name);
		this.setState(() => {
			return {
				name: '',
				disabled: true
			};
		});
	}

	render(): JSX.Element {
		const props: IProps = this.props;
		const state: IState = this.state as IState;

		return (
			<Modal show={props.show} onHide={props.onHide}>
				<ModalHeader closeButton>
					<ModalTitle>Введите название новой беседы</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<input onChange={this.onChange} />
				</ModalBody>
				<ModalFooter>
					<Button onClick={props.onHide}>Отмена</Button>
					<Button onClick={this.onSubmit} disabled={state.disabled}>Создать</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

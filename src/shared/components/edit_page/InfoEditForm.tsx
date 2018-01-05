import * as React from 'react';
import EditState from '../../states/EditState';
import * as Form from 'react-bootstrap/lib/Form';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as Button from 'react-bootstrap/lib/Button';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Col from 'react-bootstrap/lib/Col';
import InputChecker from '../../InputChecker';
import User from '../../models/User';
import * as EditActions from '../../redux/actions/EditActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdvancedDatePicker from './AdvancedDatePicker';
import ResultAlert from '../alerts/ResultAlert';

interface IInfoEditFormProps extends React.ClassAttributes<InfoEditForm> {
	editState: EditState;
	token: string;
	editUserInfo?: (userInfo: User, token: string) => void;
}

interface IInfoEditFormState {
	name: string;
	surname: string;
	city: string;
	birthday: number;
	about: string;
	submittable: boolean;
	showResult: boolean;
}

class InfoEditForm extends React.Component<IInfoEditFormProps, IInfoEditFormState> {
	constructor(props: IInfoEditFormProps) {
		super(props);
		this.state = {
			name: props.editState.name,
			surname: props.editState.surname,
			city: props.editState.city,
			birthday: props.editState.birthday,
			about: props.editState.about,
			submittable: InfoEditForm.isSubmittable(props.editState.name, props.editState.surname),
			showResult: false
		};
		this.onNameChange = this.onNameChange.bind(this);
		this.onSurnameChange = this.onSurnameChange.bind(this);
		this.onCityChange = this.onCityChange.bind(this);
		this.onBirthdayChange = this.onBirthdayChange.bind(this);
		this.onAboutChange = this.onAboutChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(props: IInfoEditFormProps): void {
		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				showResult: true
			};
		});
	}

	static isSubmittable(name: string, surname: string): boolean {
		return InputChecker.checkName(name) && InputChecker.checkSurname(surname);
	}

	onNameChange(e: React.FormEvent<FormControl>): void {
		const name: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				name: name,
				submittable: InfoEditForm.isSubmittable(name, prevState.surname),
				showResult: false
			};
		});
	}

	onSurnameChange(e: React.FormEvent<FormControl>): void {
		const surname: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				surname: surname,
				submittable: InfoEditForm.isSubmittable(prevState.name, surname),
				showResult: false
			};
		});
	}

	onCityChange(e: React.FormEvent<FormControl>): void {
		const city: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				city: city,
				showResult: false
			};
		});
	}

	onAboutChange(e: React.FormEvent<FormControl>): void {
		const about: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				about: about,
				showResult: false
			};
		});
	}

	onBirthdayChange(value: number): void {
		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				birthday: value,
				showResult: false
			};
		});
	}

	onSubmit(e: React.FormEvent<Button>): void {
		e.preventDefault();

		this.setState((prevState: IInfoEditFormState) => {
			return {
				...prevState,
				showResult: false
			};
		});

		const state: IInfoEditFormState = this.state as IInfoEditFormState;
		const props: IInfoEditFormProps = this.props;
		props.editUserInfo(
			new User(undefined, undefined, undefined, state.name, state.surname, state.city, state.birthday, state.about),
			props.token
		);
	}

	render(): JSX.Element {
		const state: IInfoEditFormState = this.state as IInfoEditFormState;
		const props: IInfoEditFormProps = this.props;
		const resultCode: number = props.editState.resultCode;
		const result: JSX.Element = (state.showResult)
			? <Col sm={10} smOffset={2}><ResultAlert resultCode={resultCode} /></Col>
			: null;
		return (
			<Form horizontal>
				<FormGroup>
					<Col sm={2} componentClass={ControlLabel}>Имя:</Col>
					<Col sm={10}><FormControl value={state.name} onChange={this.onNameChange}/></Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} componentClass={ControlLabel}>Фамилия:</Col>
					<Col sm={10}><FormControl value={state.surname} onChange={this.onSurnameChange}/></Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} componentClass={ControlLabel}>Город:</Col>
					<Col sm={10}><FormControl value={state.city} onChange={this.onCityChange}/></Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} componentClass={ControlLabel}>День рождения:</Col>
					<Col sm={10}>
						<AdvancedDatePicker initValue={state.birthday} onChangeCallback={this.onBirthdayChange}/>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} componentClass={ControlLabel}>О себе:</Col>
					<Col sm={10}>
						<FormControl componentClass='textarea' value={state.about} onChange={this.onAboutChange}/>
					</Col>
				</FormGroup>

				<Col sm={10} smOffset={2}>
					<Button type='submit' disabled={!state.submittable} onClick={this.onSubmit}>Изменить</Button>
				</Col>
				{result}
			</Form>
		);
	}
}

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(EditActions, dispatch);
};

export default connect<{}, {}, IInfoEditFormProps>(null, mapDispatchToProps)(InfoEditForm);

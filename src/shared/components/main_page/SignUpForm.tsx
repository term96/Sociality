import * as React from 'react';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as Button from 'react-bootstrap/lib/Button';
import * as Form from 'react-bootstrap/lib/Form';
import * as Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';
import * as AuthActions from '../../redux/actions/AuthActions';
import { bindActionCreators } from 'redux';
import InputChecker from '../../InputChecker';
import AuthState from '../../states/AuthState';
import AppState from '../../redux/AppState';
import MessageProvider from '../../MessageProvider';

interface ISignUpFormProps {
	authState?: AuthState;
	signUp?: Function;
}

interface ISignUpFormState {
	login: string;
	password: string;
	name: string;
	surname: string;
	submittable: boolean;
	showError: boolean;
}

class SignUpForm extends React.Component<ISignUpFormProps, ISignUpFormState> {
	constructor(props: ISignUpFormProps) {
		super(props);
		this.state = {
			login: '',
			password: '',
			name: '',
			surname: '',
			submittable: false,
			showError: false
		};
		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onSurnameChange = this.onSurnameChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static isSubmittable(login: string, password: string, name: string, surname: string): boolean {
		return InputChecker.checkLogin(login) && InputChecker.checkPassword(password) &&
				InputChecker.checkName(name) && InputChecker.checkSurname(surname);
	}

	onLoginChange(e: React.FormEvent<FormControl>): void {
		const login: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				login: login,
				submittable: SignUpForm.isSubmittable(login, prevState.password, prevState.name, prevState.surname)
			};
		});
	}

	onPasswordChange(e: React.FormEvent<FormControl>): void {
		const password: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				password: password,
				submittable: SignUpForm.isSubmittable(prevState.login, password, prevState.name, prevState.surname)
			};
		});
	}

	onNameChange(e: React.FormEvent<FormControl>): void {
		const name: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				name: name,
				submittable: SignUpForm.isSubmittable(prevState.login, prevState.password, name, prevState.surname)
			};
		});
	}

	onSurnameChange(e: React.FormEvent<FormControl>): void {
		const surname: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				surname: surname,
				submittable: SignUpForm.isSubmittable(prevState.login, prevState.password, prevState.name, surname)
			};
		});
	}

	onSubmit(e: React.FormEvent<Button>): void {
		e.preventDefault();
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				showError: true
			};
		});
		const state: ISignUpFormState = this.state as ISignUpFormState;
		const props: ISignUpFormProps = this.props as ISignUpFormProps;
		props.signUp(state.login, state.password, state.name, state.surname);
	}

	render(): JSX.Element {
		const state: ISignUpFormState = this.state as ISignUpFormState;
		const props: ISignUpFormProps = this.props as ISignUpFormProps;
		const errorNumber: number = props.authState.errorNumber;
		const errorText: JSX.Element =
			errorNumber && state.showError ? <p>{MessageProvider.getMessage(errorNumber)}</p> : null;
		return (
			<div>
				<Form horizontal>
					<FormGroup>
						<Col sm={2} componentClass={ControlLabel}>Login</Col>
						<Col sm={10}><FormControl onChange={this.onLoginChange} /></Col>
					</FormGroup>
					<FormGroup>
						<Col sm={2} componentClass={ControlLabel}>Password</Col>
						<Col sm={10}><FormControl onChange={this.onPasswordChange} /></Col>
					</FormGroup>
					<FormGroup>
						<Col sm={2} componentClass={ControlLabel}>Name</Col>
						<Col sm={10}><FormControl onChange={this.onNameChange} /></Col>
					</FormGroup>
					<FormGroup>
						<Col sm={2} componentClass={ControlLabel}>Surname</Col>
						<Col sm={10}><FormControl onChange={this.onSurnameChange} /></Col>
					</FormGroup>
					<Col sm={10} smOffset={2}>
						<Button type='submit' disabled={!state.submittable} onClick={this.onSubmit}>Send</Button>
					</Col>
					<Col sm={10} smOffset={2}>
						{errorText}
					</Col>
				</Form>
			</div>
		);
	}
}

const mapStateToProps: any = (appState: AppState) => {
	return {
		authState: appState.authState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(AuthActions, dispatch);
};

export default connect<{}, {}, ISignUpFormProps>(mapStateToProps, mapDispatchToProps)(SignUpForm);

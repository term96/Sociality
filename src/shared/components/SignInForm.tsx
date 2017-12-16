import * as React from 'react';
import AuthState from '../models/AuthState';
import InputChecker from '../InputChecker';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as Button from 'react-bootstrap/lib/Button';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import MessageProvider from '../MessageProvider';
import AppState from '../redux/AppState';
import * as MainActions from '../redux/actions/MainActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Form from 'react-bootstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Col from 'react-bootstrap/lib/Col';

interface ISignInFormProps {
	authState?: AuthState;
	signIn?: Function;
}

interface ISignInFormState {
	login: string;
	password: string;
	submittable: boolean;
	showError: boolean;
}

class SignInForm extends React.Component<ISignInFormProps, ISignInFormState> {
	constructor(props: ISignInFormProps) {
		super(props);
		this.state = {
			login: '',
			password: '',
			submittable: false,
			showError: false
		};
		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static isSubmittable(login: string, password: string): boolean {
		return InputChecker.checkLogin(login) && InputChecker.checkPassword(password);
	}

	onLoginChange(e: React.FormEvent<FormControl>): void {
		const login: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignInFormState) => {
			return {
				...prevState,
				login: login,
				submittable: SignInForm.isSubmittable(login, prevState.password)
			};
		});
	}

	onPasswordChange(e: React.FormEvent<FormControl>): void {
		const password: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignInFormState) => {
			return {
				...prevState,
				password: password,
				submittable: SignInForm.isSubmittable(prevState.login, password)
			};
		});
	}

	onSubmit(e: React.FormEvent<Button>): void {
		e.preventDefault();
		this.setState((prevState: ISignInFormState) => {
			return {
				...prevState,
				showError: true
			};
		});
		const state: ISignInFormState = this.state as ISignInFormState;
		const props: ISignInFormProps = this.props as ISignInFormProps;
		props.signIn(state.login, state.password);
	}

	render(): JSX.Element {
		const state: ISignInFormState = this.state as ISignInFormState;
		const props: ISignInFormProps = this.props as ISignInFormProps;
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
	return bindActionCreators(MainActions, dispatch);
};

export default connect<{}, {}, ISignInFormProps>(mapStateToProps, mapDispatchToProps)(SignInForm);

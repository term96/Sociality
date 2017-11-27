import * as React from 'react';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as mainActions from '../redux/actions/MainActions';
import { bindActionCreators } from 'redux';

interface ISignUpFormProps {
	signUp?: Function;
}

interface ISignUpFormState {
	login: string;
	password: string;
	name: string;
	surname: string;
	submittable: boolean;
	submitted: boolean;
}

export class SignUpForm extends React.Component<ISignUpFormProps, ISignUpFormState> {
	constructor(props: ISignUpFormProps) {
		super(props);
		this.state = {
			login: '',
			password: '',
			name: '',
			surname: '',
			submittable: false,
			submitted: false
		};
		this.onLoginChange = this.onLoginChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onSurnameChange = this.onSurnameChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onLoginChange(e: React.FormEvent<FormControl>): void {
		const login: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				login: login,
				submittable: login.length && prevState.password.length
				&& prevState.name.length && prevState.surname.length && !prevState.submitted
			};
		});
	}

	onPasswordChange(e: React.FormEvent<FormControl>): void {
		const password: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				password: password,
				submittable: prevState.login.length && password.length
				&& prevState.name.length && prevState.surname.length && !prevState.submitted
			};
		});
	}

	onNameChange(e: React.FormEvent<FormControl>): void {
		const name: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				name: name,
				submittable: prevState.login.length && prevState.password.length
				&& name.length && prevState.surname.length && !prevState.submitted
			};
		});
	}

	onSurnameChange(e: React.FormEvent<FormControl>): void {
		const surname: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				surname: surname,
				submittable: prevState.login.length && prevState.password.length
				&& prevState.name.length && surname.length && !prevState.submitted
			};
		});
	}

	onSubmit(e: React.FormEvent<Button>): void {
		e.preventDefault();
		this.setState((prevState: ISignUpFormState) => {
			return {
				...prevState,
				submitted: true,
				submittable: false
			};
		});
		const state: ISignUpFormState = this.state as ISignUpFormState;
		(this.props as ISignUpFormProps).signUp(state.login, state.password, state.name, state.surname);
	}

	render(): JSX.Element {
		const state: ISignUpFormState = this.state as ISignUpFormState;
		const submittedText: JSX.Element = state.submitted ? <p>Submitted!</p> : <p>Not submitted</p>;
		return (
			<div>
				<form>
					<FormGroup>
						<ControlLabel>Login</ControlLabel>
						<FormControl onChange={this.onLoginChange} />
					</FormGroup>
					<FormGroup>
						<ControlLabel>Password</ControlLabel>
						<FormControl onChange={this.onPasswordChange} />
					</FormGroup>
					<FormGroup>
						<ControlLabel>Name</ControlLabel>
						<FormControl onChange={this.onNameChange} />
					</FormGroup>
					<FormGroup>
						<ControlLabel>Surname</ControlLabel>
						<FormControl onChange={this.onSurnameChange} />
					</FormGroup>
					<Button type='submit' disabled={!state.submittable} onClick={this.onSubmit}>Send</Button>
					{submittedText}
				</form>
			</div>
		);
	}
}

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(mainActions, dispatch);
};

export default connect(null, mapDispatchToProps, null)(SignUpForm);

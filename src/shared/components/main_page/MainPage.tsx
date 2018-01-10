import * as React from 'react';
import AppState from '../../redux/AppState';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import AuthState from '../../states/AuthState';
import { default as SignUpForm } from './SignUpForm';
import { default as SignInForm } from './SignInForm';
import PageRoutes from '../../routes/PageRoutes';

interface IMainPageProps extends React.ClassAttributes<MainPage> {
	authState: AuthState;
}

interface IMainPageState {
	signInChosen: boolean;
}

class MainPage extends React.Component<IMainPageProps, IMainPageState> {
	constructor(props: IMainPageProps) {
		super(props);
		this.state = {
			signInChosen: true
		};
		this.onSignInChosen = this.onSignInChosen.bind(this);
		this.onSignUpChosen = this.onSignUpChosen.bind(this);
	}

	render(): JSX.Element {
		const props: IMainPageProps = this.props as IMainPageProps;
		if (props.authState.id && props.authState.token) {
			const myPageLink: string = PageRoutes.user + `/${props.authState.id}`;
			return <Redirect to={myPageLink} />;
		}
		const state: IMainPageState = this.state as IMainPageState;
		const signInOption: JSX.Element = <a href='#' onClick={this.onSignInChosen}>Войдите в систему</a>;
		const signUpOption: JSX.Element = <a href='#' onClick={this.onSignUpChosen}>зарегистрируйтесь</a>;
		return (
			<div>
				<div><p>{signInOption} или {signUpOption}</p></div>
				{state.signInChosen ? <SignInForm /> : <SignUpForm />}
			</div>
		);
	}

	onSignInChosen(e: React.MouseEvent<HTMLAnchorElement>): void {
		e.preventDefault();
		this.setState((prevState: IMainPageState) => {
			return {
				...prevState,
				signInChosen: true
			};
		});
	}

	onSignUpChosen(e: React.MouseEvent<HTMLAnchorElement>): void {
		e.preventDefault();
		this.setState((prevState: IMainPageState) => {
			return {
				...prevState,
				signInChosen: false
			};
		});
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState
	};
};

export default connect(mapStateToProps, null)(MainPage);

import * as React from 'react';
import { AppState } from '../redux/AppState';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import AuthState from '../models/AuthState';
import SignUpForm from './SignUpForm';

interface IMainPageProps extends React.ClassAttributes<MainPage> {
	authState: AuthState;
}

export class MainPage extends React.Component<IMainPageProps, {}> {
	render(): JSX.Element {
		const props: IMainPageProps = this.props as IMainPageProps;
		if (props.authState.id && props.authState.token) {
			return <Redirect to='/user' />;
		}
		return (
			<div>
				<SignUpForm />
			</div>
		);
	}
}

const mapStatsToProps: any = (state: AppState) => {
	return {
		authState: state.authState
	};
};

export default connect(mapStatsToProps, null, null)(MainPage);

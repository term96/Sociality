import * as React from 'react';
import * as userActions from '../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppState from '../redux/AppState';
import UserState from '../models/UserState';
import { Redirect } from 'react-router';
import UserInfo from './UserInfo';
import AuthState from '../models/AuthState';

interface IUserPageProps {
	authState: AuthState;
	userState: UserState;
	getUserInfo: Function;
}

export class UserPage extends React.Component<IUserPageProps, {}> {
	componentDidMount(): void {
		const props: IUserPageProps = this.props as IUserPageProps;
		if (props.authState.id && props.authState.token) {
			props.getUserInfo(props.authState.id);
		}
	}

	render(): JSX.Element {
		const props: IUserPageProps = this.props as IUserPageProps;

		if (!props.authState.id || !props.authState.token) {
			return <Redirect to='/' />;
		}

		return (
			<div>
				<UserInfo userState={props.userState} />
			</div>
		);
	}

	static fetchData({ store }: any): any {
		return store.dispatch(userActions.getUserInfo(1));
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState,
		userState: state.userState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(userActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null)(UserPage);
// export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserPage);

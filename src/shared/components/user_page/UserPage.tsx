import * as React from 'react';
import * as userActions from '../../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppState from '../../redux/AppState';
import UserState from '../../states/UserState';
import { Redirect } from 'react-router';
import UserInfoPanel from './UserInfoPanel';
import AuthState from '../../states/AuthState';
import PageRoutes from '../../routes/PageRoutes';

interface IUserPageProps {
	authState: AuthState;
	userState: UserState;
	getUserInfo: Function;
}

class UserPage extends React.Component<IUserPageProps, {}> {
	componentDidMount(): void {
		const props: IUserPageProps = this.props as IUserPageProps;
		if (props.authState.id && props.authState.token) {
			props.getUserInfo(props.authState.id);
		}
	}

	render(): JSX.Element {
		const props: IUserPageProps = this.props as IUserPageProps;

		if (!props.authState.id || !props.authState.token) {
			return <Redirect to={PageRoutes.main} />;
		}

		return (
			<div>
				<UserInfoPanel userState={props.userState} />
			</div>
		);
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

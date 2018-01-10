import * as React from 'react';
import * as userActions from '../../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppState from '../../redux/AppState';
import UserState from '../../states/UserState';
import UserInfoPanel from './UserInfoPanel';
import AuthState from '../../states/AuthState';
import LoadingAlert from '../alerts/LoadingAlert';
import InfoAlert from '../alerts/InfoAlert';
import { ResultCode } from '../../ResultCode';

interface IUserPageProps extends React.ClassAttributes<UserPage> {
	authState: AuthState;
	userState: UserState;
	getUserInfo: (id: number, token: string) => void;
	resetUserInfo: () => void;
	match: any;
}

class UserPage extends React.Component<IUserPageProps, {}> {
	componentDidMount(): void {
		const props: IUserPageProps = this.props as IUserPageProps;
		const id: number = props.match.params.id;
		if (props.authState.id && props.authState.token) {
			props.getUserInfo(id, props.authState.token);
		}
	}

	componentWillReceiveProps(nextProps: IUserPageProps): void {
		const props: IUserPageProps = this.props;
		if (props.match.params.id !== nextProps.match.params.id) {
			props.getUserInfo(nextProps.match.params.id, nextProps.authState.token);
		}
	}

	render(): JSX.Element {
		const props: IUserPageProps = this.props as IUserPageProps;

		if (props.userState.resultCode !== undefined && props.userState.resultCode !== ResultCode.OK) {
			return (
				<InfoAlert resultCode={props.userState.resultCode} />
			);
		}

		if (props.userState.resultCode === undefined && props.userState.id === undefined) {
			return (
				<LoadingAlert />
			);
		}

		return (
			<UserInfoPanel userState={props.userState} />
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

import * as React from 'react';
import UserInfo from './UserInfo';
import * as userActions from '../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class UserPage extends React.Component<any, any> {
	componentDidMount(): void {
		this.props.getUserInfo(1);
	}

	render(): JSX.Element {
		return (
			<div>
				<UserInfo userInfo={this.props.userInfo} />
				<div className='SOMETHING'>Hello</div>
			</div>
		);
	}

	static fetchData({ store }: any): any {
		return store.dispatch(userActions.getUserInfo(1));
	}
}

const mapStateToProps: any = (state: any) => {
	return {
		userInfo: {
			...state.userState
		}
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(userActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UserPage);

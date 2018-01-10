import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppState from '../../redux/AppState';
import AuthState from '../../states/AuthState';
import LoadingAlert from '../alerts/LoadingAlert';
import FriendsState from '../../states/FriendsState';
import * as friendsActions from '../../redux/actions/FriendsActions';
import * as Panel from 'react-bootstrap/lib/Panel';
import * as PanelHeading from 'react-bootstrap/lib/PanelHeading';
import * as PanelBody from 'react-bootstrap/lib/PanelBody';
import FriendsList from './FriendsList';

interface IFriendsPageProps extends React.ClassAttributes<FriendsPage> {
	authState: AuthState;
	friendsState: FriendsState;
	resetFriendsList: () => void;
	loadFriendsList: (token: string) => void;
}

class FriendsPage extends React.Component<IFriendsPageProps> {
	componentDidMount(): void {
		const props: IFriendsPageProps = this.props;
		props.resetFriendsList();
		props.loadFriendsList(props.authState.token);
	}

	render(): JSX.Element {
		const props: IFriendsPageProps = this.props;
		if (props.friendsState.resultCode === undefined) {
			return <LoadingAlert />;
		}

		return (
			<Panel>
				<PanelHeading>Список друзей</PanelHeading>
				<PanelBody>
					<FriendsList friendsState={props.friendsState} />
				</PanelBody>
			</Panel>
		);
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState,
		friendsState: state.friendsState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(friendsActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null)(FriendsPage);

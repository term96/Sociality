import * as React from 'react';
import { Redirect } from 'react-router';
import * as AuthActions from '../redux/actions/AuthActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageRoutes from '../routes/PageRoutes';

interface ISignOutPageProps extends React.ClassAttributes<SignOutPage> {
	signOut: () => void;
}

class SignOutPage extends React.Component<ISignOutPageProps> {
	componentDidMount(): void {
		const props: ISignOutPageProps = this.props;
		props.signOut();
	}

	render(): JSX.Element {
		return (
			<Redirect to={PageRoutes.main} />
		);
	}
}

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(AuthActions, dispatch);
};

export default connect<{}, {}, ISignOutPageProps>(null, mapDispatchToProps)(SignOutPage);

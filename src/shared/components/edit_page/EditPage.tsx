import * as React from 'react';
import AuthState from '../../states/AuthState';
import AppState from '../../redux/AppState';
import { connect } from 'react-redux';
import { default as InfoEditForm } from './InfoEditForm';
import EditState from '../../states/EditState';
import { bindActionCreators } from 'redux';
import * as EditActions from '../../redux/actions/EditActions';
import LoadingAlert from '../alerts/LoadingAlert';
import { ResultCode } from '../../ResultCode';
import InfoAlert from '../alerts/InfoAlert';
import { default as AvatarUploader } from './AvatarUploader';

interface IEditPageProps extends React.ClassAttributes<EditPage> {
	authState?: AuthState;
	editState?: EditState;
	getEditableUserInfo?: (token: string) => void;
}

interface IEditPageState {
	showForm: boolean;
}

class EditPage extends React.Component<IEditPageProps> {
	constructor(props: IEditPageProps) {
		super(props);
		this.state = {
			showForm: false
		};
	}

	componentDidMount(): void {
		const props: IEditPageProps = this.props;
		props.getEditableUserInfo(props.authState.token);
	}

	componentWillReceiveProps(nextProps: IEditPageProps): void {
		const state: IEditPageState = this.state as IEditPageState;
		if (state.showForm) {
			return;
		}

		if (nextProps.editState.resultCode !== undefined) {
			this.setState(() => {
				return {
					showForm: nextProps.editState.resultCode === ResultCode.OK
				};
			});
		}
	}

	render(): JSX.Element {
		const props: IEditPageProps = this.props;
		const state: IEditPageState = this.state as IEditPageState;

		if (props.editState.resultCode === undefined) {
			return <LoadingAlert />;
		}

		if (!state.showForm) {
			return <InfoAlert resultCode={props.editState.resultCode} />;
		}

		return (
			<div>
				<AvatarUploader token={props.authState.token} />
				<InfoEditForm editState={props.editState} token={props.authState.token} />
			</div>
		);
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState,
		editState: state.editState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(EditActions, dispatch);
};

export default connect<{}, {}, IEditPageProps>(mapStateToProps, mapDispatchToProps)(EditPage);

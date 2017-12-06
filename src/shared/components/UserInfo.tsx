import * as React from 'react';
import UserState from '../models/UserState';

export interface IUserInfoProps {
	userState: UserState;
}

export default class UserInfo extends React.Component<IUserInfoProps, {}> {
	render(): JSX.Element {
		const props: IUserInfoProps = this.props;

		if (props.userState.errorNumber) {
			return (
				<div>
					<span>Ошибка {props.userState.errorNumber}, попробуйте обновить страницу</span>
				</div>
			);
		}

		return (
			<div>
				<span>Ошибки нет, но и инфы нет :(</span>
				<span>ID: {props.userState.id}</span>
			</div>
		);
	}
};

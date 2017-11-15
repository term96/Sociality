import * as React from 'react';

export interface IUserInfoProps {
	userInfo: {};
}

export default class UserInfo extends React.Component<IUserInfoProps, {}> {
	render(): JSX.Element {
		const fields: JSX.Element[] = [];
		for (const key in this.props.userInfo) {
			if (this.props.userInfo.hasOwnProperty(key)) {
				fields.push(<li key={key}>{this.props.userInfo[key]} {key}</li>);
			}
		}

		return (
			<div>
				<ul>
					{fields}
				</ul>
			</div>
		);
	}
}

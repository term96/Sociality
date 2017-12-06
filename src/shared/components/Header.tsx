import * as React from 'react';
import * as Navbar from 'react-bootstrap/lib/Navbar';
import * as Nav from 'react-bootstrap/lib/Nav';
import * as NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import AuthState from '../models/AuthState';
import { connect } from 'react-redux';
import AppState from '../redux/AppState';
import * as Col from 'react-bootstrap/lib/Col';

interface IHeaderProps {
	authState?: AuthState;
}

export class Header extends React.Component<IHeaderProps, {}> {
	render(): JSX.Element {
		const props: IHeaderProps = this.props as IHeaderProps;
		const myPageLink: string = `/user/${props.authState.id}`;
		const navigation: JSX.Element = (
			<Navbar.Collapse>
				<Nav>
					<LinkContainer to={myPageLink}><NavItem eventKey='1'>Моя страница</NavItem></LinkContainer>
					<LinkContainer to='/friends'><NavItem eventKey='2'>Друзья</NavItem></LinkContainer>
					<LinkContainer to='/dialogs'><NavItem eventKey='3'>Диалоги</NavItem></LinkContainer>
					<LinkContainer to='/files'><NavItem eventKey='4'>Файлы</NavItem></LinkContainer>
				</Nav>
				<Nav pullRight>
					<LinkContainer to='/search'><NavItem eventKey='1'>Поиск людей</NavItem></LinkContainer>
					<LinkContainer to='/edit'><NavItem eventKey='2'>Изменение данных</NavItem></LinkContainer>
					<LinkContainer to='/sign_out'><NavItem eventKey='3'>Выход</NavItem></LinkContainer>
				</Nav>
			</Navbar.Collapse>
		);
		return (
			<Navbar fluid>
				<Col sm={8} smOffset={2}>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to='/'>Sociality</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				{(props.authState.id && props.authState.token) ? navigation : null}
				</Col>
			</Navbar>
		);
	}
}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState
	};
};

export default connect(mapStateToProps, null, null)(Header);

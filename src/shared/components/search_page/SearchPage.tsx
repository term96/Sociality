import * as React from 'react';
import SearchState from '../../states/SearchState';
import AuthState from '../../states/AuthState';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppState from '../../redux/AppState';
import * as SearchActions from '../../redux/actions/SearchActions';
import * as Form from 'react-bootstrap/lib/Form';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as Col from 'react-bootstrap/lib/Col';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as Button from 'react-bootstrap/lib/Button';
import * as Panel from 'react-bootstrap/lib/Panel';
import * as PanelHeading from 'react-bootstrap/lib/PanelHeading';
import * as PanelBody from 'react-bootstrap/lib/PanelBody';
import UsersList from './UsersList';
import * as Row from 'react-bootstrap/lib/Row';

interface ISearchPageProps extends React.ClassAttributes<SearchPage> {
	authState: AuthState;
	searchState: SearchState;
	resetSearchData: () => void;
	loadSearchData: (data: object, token: string) => void;
}

interface ISearchPageState {
	name: string;
	surname: string;
	city: string;
	minAge: string;
	maxAge: string;
	currentPos: number;
}

const defaultLimit: number = 3;

class SearchPage extends React.Component<ISearchPageProps> {
	constructor(props: ISearchPageProps) {
		super(props);
		this.state = {
			name: '',
			surname: '',
			city: '',
			minAge: '',
			maxAge: '',
			currentPos: 0
		};
		this.onNameChange = this.onNameChange.bind(this);
		this.onSurnameChange = this.onSurnameChange.bind(this);
		this.onCityChange = this.onCityChange.bind(this);
		this.onMinAgeChange = this.onMinAgeChange.bind(this);
		this.onMaxAgeChange = this.onMaxAgeChange.bind(this);
		this.onSearchClicked = this.onSearchClicked.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	componentDidMount(): void {
		const props: ISearchPageProps = this.props;
		props.resetSearchData();
	}

	onNameChange(e: React.FormEvent<FormControl>): void {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				name: value
			};
		});
	}

	onSurnameChange(e: React.FormEvent<FormControl>): void {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				surname: value
			};
		});
	}

	onCityChange(e: React.FormEvent<FormControl>): void {
		const value: string = (e.target as HTMLInputElement).value;
		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				city: value
			};
		});
	}

	onMinAgeChange(e: React.FormEvent<FormControl>): void {
		const value: number = Math.abs(parseInt((e.target as HTMLInputElement).value, 10));
		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				minAge: (!Number.isNaN(value)) ? String(value) : ''
			};
		});
	}

	onMaxAgeChange(e: React.FormEvent<FormControl>): void {
		const value: number = Math.abs(parseInt((e.target as HTMLInputElement).value, 10));
		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				maxAge: (!Number.isNaN(value)) ? String(value) : ''
			};
		});
	}

	getSearchData(offset: number): object {
		const state: ISearchPageState = this.state as ISearchPageState;
		return {
			name: state.name || undefined,
			surname: state.surname || undefined,
			city: state.city || undefined,
			minAge: (state.minAge !== '') ? parseInt(state.minAge, 10) : undefined,
			maxAge: (state.maxAge !== '') ? parseInt(state.maxAge, 10) : undefined,
			offset: offset,
			limit: defaultLimit
		};
	}

	onSearchClicked(): void {
		const props: ISearchPageProps = this.props;

		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				currentPos: 0
			};
		});

		props.resetSearchData();
		props.loadSearchData(this.getSearchData(0), props.authState.token);
	}

	loadMore(): void {
		const state: ISearchPageState = this.state as ISearchPageState;
		const props: ISearchPageProps = this.props;
		const pos: number = state.currentPos + defaultLimit;
		this.setState((prevState: ISearchPageState) => {
			return {
				...prevState,
				currentPos: pos
			};
		});
		props.loadSearchData(this.getSearchData(pos), props.authState.token);
	}

	render(): JSX.Element {
		const state: ISearchPageState = this.state as ISearchPageState;
		const props: ISearchPageProps = this.props;
		const searchResult: JSX.Element = (props.searchState.resultCode !== undefined) ?
			<Panel>
				<PanelHeading>Результаты поиска</PanelHeading>
				<PanelBody>
					<UsersList searchState={props.searchState} loadMore={this.loadMore}/>
				</PanelBody>
			</Panel>
			: null;

		return (
			<div>
				<Panel>
					<PanelHeading>Введите данные для поиска</PanelHeading>
					<PanelBody>
						<Form horizontal>
							<FormGroup>
								<Col sm={4} componentClass={ControlLabel}>Имя:</Col>
								<Col sm={8}><FormControl onChange={this.onNameChange}/></Col>
							</FormGroup>
							<FormGroup>
								<Col sm={4} componentClass={ControlLabel}>Фамилия:</Col>
								<Col sm={8}><FormControl onChange={this.onSurnameChange}/></Col>
							</FormGroup>
							<FormGroup>
								<Col sm={4} componentClass={ControlLabel}>Город:</Col>
								<Col sm={8}><FormControl onChange={this.onCityChange}/></Col>
							</FormGroup>
							<FormGroup>
								<Col sm={4} componentClass={ControlLabel}>Минимальный возраст:</Col>
								<Col sm={8}><FormControl onChange={this.onMinAgeChange} value={state.minAge}/></Col>
							</FormGroup>
							<FormGroup>
								<Col sm={4} componentClass={ControlLabel}>Максимальный возраст:</Col>
								<Col sm={8}><FormControl onChange={this.onMaxAgeChange} value={state.maxAge}/></Col>
							</FormGroup>
							<Row><Col smOffset={4}><Button onClick={this.onSearchClicked}>Искать</Button></Col></Row>
						</Form>
					</PanelBody>
				</Panel>
				{searchResult}
			</div>
		);
	}

}

const mapStateToProps: any = (state: AppState) => {
	return {
		authState: state.authState,
		searchState: state.searchState
	};
};

const mapDispatchToProps: Function = (dispatch: any) => {
	return bindActionCreators(SearchActions, dispatch);
};

export default connect<{}, {}, ISearchPageProps>(mapStateToProps, mapDispatchToProps)(SearchPage);

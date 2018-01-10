import * as React from 'react';
import * as Datetime from 'react-datetime';
import * as moment from 'moment';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as InputGroup from 'react-bootstrap/lib/InputGroup';
import * as InputGroupButton from 'react-bootstrap/lib/InputGroupButton';
import * as FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
import * as Button from 'react-bootstrap/lib/Button';

interface IProps extends React.ClassAttributes<AdvancedDatePicker> {
	onChangeCallback: (value: number) => void;
	initValue: number;
}

interface IState {
	value: number;
	open: boolean;
}

export default class AdvancedDatePicker extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			value: props.initValue,
			open: false
		};
		this.clear = this.clear.bind(this);
		this.onChange = this.onChange.bind(this);
		this.openDateTimePicker = this.openDateTimePicker.bind(this);
		this.onOutsideClick = this.onOutsideClick.bind(this);
	}

	clear(e: React.MouseEvent<Button>): void {
		e.preventDefault();
		this.setState(() => {
			const props: IProps = this.props;
			props.onChangeCallback(undefined);

			return {
				value: undefined,
				open: false
			};
		});
	}

	onChange(e: React.ChangeEvent<any> | moment.Moment | string): void {
		const newValue: number = Number(e.valueOf());
		this.setState(() => {
			const props: IProps = this.props;
			props.onChangeCallback(Number.NaN ? undefined : newValue);

			return {
				value: newValue === Number.NaN ? undefined : newValue,
				open: false
			};
		});
	}

	onOutsideClick(): void {
		this.setState((prevState: IState) => {
			return {
				value: prevState.value,
				open: false
			};
		});
	}

	openDateTimePicker(e: React.MouseEvent<FormControl>): void {
		e.preventDefault();
		this.setState((prevState: IState) => {
			return {
				value: prevState.value,
				open: true
			};
		});
	}

	render(): JSX.Element {
		const state: IState = this.state as IState;
		const dateValue: string = (state.value === undefined || state.value === null)
			? 'Дата не выбрана'
			: moment(state.value).format('LL');
		return (
			<div>
				<InputGroup>
					<FormControlStatic value={dateValue} onClick={this.openDateTimePicker}>
						{dateValue}
					</FormControlStatic>
					<InputGroupButton><Button onClick={this.clear}>X</Button></InputGroupButton>
				</InputGroup>
				<Datetime
					value={new Date(state.value)}
					viewMode='years'
					timeFormat={false}
					utc={true}
					closeOnSelect={true}
					onChange={this.onChange}
					onBlur={this.onOutsideClick}
					open={state.open}
					input={false}
				/>
			</div>
		);
	}
}

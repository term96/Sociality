import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { ResultCode } from '../../ResultCode';
import InfoAlert from '../alerts/InfoAlert';
import * as Button from 'react-bootstrap/lib/Button';
import LoadingAlert from '../alerts/LoadingAlert';
import * as Row from 'react-bootstrap/lib/Row';
import * as Image from 'react-bootstrap/lib/Image';
import * as Col from 'react-bootstrap/lib/Col';

interface IAvatarUploaderProps extends React.ClassAttributes<AvatarUploader> {
	token: string;
}

interface IAvatarUploaderState {
	resultCode: ResultCode;
	uploading: boolean;
	loadingFromDisk: boolean;
	showUploadButton: boolean;
	imageData: string;
}

export default class AvatarUploader extends React.Component<IAvatarUploaderProps> {
	constructor(props: IAvatarUploaderProps) {
		super(props);
		this.state = {
			resultCode: undefined,
			uploading: false,
			loadingFromDisk: false,
			showUploadButton: false,
			imageData: undefined
		};
		this.onChange = this.onChange.bind(this);
		this.onChooseClicked = this.onChooseClicked.bind(this);
		this.onUploadClicked = this.onUploadClicked.bind(this);
	}

	private hiddenInput: HTMLInputElement;

	onChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const length: number = e.target.files.length;
		const changeState: Function = (showUploadButton: boolean, loadingFromDisk: boolean, imageData: string) => {
			this.setState((prevState: IAvatarUploaderState) => {
				return {
					...prevState,
					resultCode: undefined,
					showUploadButton: showUploadButton,
					loadingFromDisk: loadingFromDisk,
					imageData: imageData
				};
			});
		};

		if (length === 0) {
			changeState(false, undefined);
			return;
		}

		const fileReader: FileReader = new FileReader();
		fileReader.onloadstart = () => {
			changeState(false, true, undefined);
		};
		fileReader.onabort = () => {
			changeState(false, false, undefined);
		};
		fileReader.onerror = () => {
			changeState(false, false, undefined);
		};
		fileReader.onloadend = () => {
			const valid: boolean = !!fileReader.result && (fileReader.result as string).startsWith('data:image');
			changeState(valid, false, valid ? fileReader.result : undefined);
		};
		fileReader.readAsDataURL(e.target.files[0]);
	}

	onChooseClicked(): void {
		this.hiddenInput.click();
	}

	onUploadClicked(): void {
		const props: IAvatarUploaderProps = this.props;
		const options: object = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		const formData: FormData = new FormData();
		formData.append('avatar', this.hiddenInput.files[0]);

		axios.post(`/api/upload/${props.token}`, formData, options)
			.then((response: AxiosResponse) => {
				this.setState(() => {
					return {
						resultCode: response.data,
						uploading: false
					};
				});
			})
			.catch(() => {
				this.setState(() => {
					return {
						resultCode: ResultCode.CONNECTION_ERROR,
						uploading: false
					};
				});
			});
		this.setState((prevState: IAvatarUploaderState) => {
			return {
				...prevState,
				uploading: true,
				imageData: undefined
			};
		});
	}

	render(): JSX.Element {
		const state: IAvatarUploaderState = this.state as IAvatarUploaderState;
		const resultAlert: JSX.Element = (state.resultCode !== undefined)
			? <InfoAlert resultCode={state.resultCode} />
			: null;
		const loadingAlert: JSX.Element = (state.uploading) ? <LoadingAlert /> : null;
		const uploadButton: JSX.Element = (state.showUploadButton)
			? <Button onClick={this.onUploadClicked} disabled={state.uploading}>Загрузить</Button>
			: null;
		const preview: JSX.Element = (state.imageData !== undefined)
			? <Row><Col sm={4}><Image className='avatar-preview' src={state.imageData} rounded responsive /></Col></Row>
			: null;
		return (
			<div>
				<input className='hidden' type='file' onChange={this.onChange}
					ref={(i: HTMLInputElement) => { this.hiddenInput = i; }}/>
				<Row>
					<Button onClick={this.onChooseClicked} disabled={state.uploading}>Изменить аватар</Button>
					{uploadButton}
				</Row>
				{preview}
				<Row>
					{resultAlert}
					{loadingAlert}
				</Row>
			</div>
		);
	}
}

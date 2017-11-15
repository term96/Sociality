import { Result } from './Result';
export default class JsonResponse {
	private _status: Result;
	private _body: Object;
	private _httpCode: number;

	public constructor(status?: Result, body?: object) {
		this._status = status;
		this._body = body;
		this.setHttpCode();
	}

	public get status(): Result {
		return this._status;
	}

	public set status(value: Result) {
		this._status = value;
		this.setHttpCode();
	}

	public get body(): Object {
		return this._body;
	}

	public set body(value: Object) {
		this._body = value;
	}

	public get httpCode(): number {
		return this._httpCode;
	}

	private setHttpCode(): void {
		switch (this._status) {
			case Result.OK:
				this._httpCode = 200;
				break;
			case Result.INTERNAL_ERROR:
				this._httpCode = 500;
				break;
			default:
				this._httpCode = 400;
		}
	}
}

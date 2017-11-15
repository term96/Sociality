import * as jsonwebtoken from 'jsonwebtoken';
import Const from './Const';

export default class JWT {
	public static sign(id: number): String {
		return jsonwebtoken.sign({ id: id }, Const.jwtSecret, { expiresIn: '24h' });
	}

	public static decodeId(token: String): number | null {
		try {
			const payload: JWTPayload = jsonwebtoken.verify(token, Const.jwtSecret);
			return payload.getId();
		} catch (err) {
			return null;
		}
	}
}

class JWTPayload {
	private _id: number;
	public constructor(id: number) {
		this._id = id;
	}
	public getId(): number {
		return this._id;
	}
}

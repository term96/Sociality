import * as jsonwebtoken from 'jsonwebtoken';
import Const from '../shared/Const';

export default class JWT {
	public static sign(id: number): string {
		return jsonwebtoken.sign({ id: id }, Const.jwtSecret, { expiresIn: '24h' });
	}

	public static decodeId(token: string): number {
		try {
			const payload: JWTPayload = jsonwebtoken.verify(token, Const.jwtSecret);
			return payload.id;
		} catch (err) {
			return undefined;
		}
	}
}

class JWTPayload {
	public id: number;
	public constructor(id: number) {
		this.id = id;
	}
}

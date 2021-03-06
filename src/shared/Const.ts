export default class Const {
	public static readonly jwtSecret: string = 'godblessthisproject';
	public static readonly serverPort: number = 3001;
	public static readonly dbHost: string = 'localhost';
	public static readonly dbPort: number = 3306;
	public static readonly dbUser: string = 'root';
	public static readonly dbPassword: string = 'root';
	public static readonly dbName: string = 'sociality';
	public static readonly storageToken: string = 'SOCIALITY_TOKEN';
	public static readonly storageId: string = 'SOCIALITY_ID';
	public static readonly maxAvatarSizeBytes: number = 2 * 1024 * 1024;
}

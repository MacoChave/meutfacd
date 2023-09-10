declare namespace Express {
	export interface Request {
		user: {
			cui: string;
			carnet: number;
			primaryKey: number;
			roles: string;
		};
		files: any;
	}
}

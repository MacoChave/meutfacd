export interface IQueryAll {
	data: any;
	next: number | undefined;
}

export interface IReturnEmail {
	accepted: string[];
	rejected: string[];
	messageId: string;
}

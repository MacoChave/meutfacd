export type TResult = {
	affectedRows: number;
	changedRows: number;
	fieldCount: number;
	insertId: number;
	info: string;
	serverStatus: number;
	warningStatus: number;
};

export type TResponse = {
	code: number;
	message: string;
	error: string;
};

type TCondition = {
	column: string;
	operator:
		| '='
		| '!='
		| '>'
		| '<'
		| '>='
		| '<='
		| 'LIKE'
		| 'NOT LIKE'
		| 'IN'
		| 'NOT IN'
		| 'BETWEEN'
		| 'NOT BETWEEN'
		| 'IS NULL'
		| 'IS NOT NULL';
	value: any;
};

export type TCustomBody = {
	table: string;
	columns?: string[];
	sort?: Record<string, 'ASC' | 'DESC'>;
	limit?: number;
	offset?: number;
	conditions?: TCondition[];
	condInclusives?: boolean;
	q?: any;
	pageNumber?: number;
	pageSize?: number;
};

import { connection } from '../config/mysql';
import { logger } from '../utils/logger';

type conditionsType = {
	column: string;
	value: any;
	operator: string;
};

type sqlSelectType = {
	table: string;
	columns?: string[];
	query?: Object;
	sort?: Object;
	limit?: number;
	offset?: number;
	conditions?: conditionsType[];
	condInclusives?: boolean;
	q?: any;
	pageNumber?: number;
	pageSize?: number;
	asArray?: boolean;
};

type sqlEjectType = {
	sql: string;
	values?: any[];
};

type sqlInsertType = {
	table: string;
	datos: Object;
};

type sqlInsertManyType = {
	table: string;
	datos: Object[];
};

type sqlUpdateType = {
	table: string;
	datos: Object;
	query: Object;
};

type sqlDeleteType = {
	table: string;
	query: Object;
};

const getWhereClause = (query: Object) => {
	const values: any[] = [];
	const where = Object.entries(query)
		.map(([key, value]) => {
			values.push(value);
			return `${key} = ?`;
		})
		.join(' AND ');
	return [where, values];
};

const getFilterWhere = (table: string, q: any) => {
	return ['', []];
};

const getSortClause = (sort: Object) => {
	return Object.entries(sort)
		.map(([key, value]) => {
			return `${key} ${value}`;
		})
		.join(', ');
};

const getSetClause = (datos: Object) => {
	const values: any[] = [];
	const str: string = Object.entries(datos)
		.map(([key, value]) => {
			values.push(value);
			return `${key} = ?`;
		})
		.join(', ');
	return [str, values];
};
const getConditionsWhere = (
	conditions: conditionsType[],
	includes: boolean = false
) => {
	const values: any[] = [];
	const where = conditions
		.map((cond) => {
			if (cond.operator === 'JSON_CONTAINS') {
				values.push(`[${cond.value}]`);
				return `JSON_CONTAINS(${cond.column}, ?)`;
			} else if (cond.value === 'null') {
				return `${cond.column} ${cond.operator} NULL`;
			} else {
				values.push(cond.value);
				return `${cond.column} ${cond.operator} ?`;
			}
		})
		.join(includes ? ' AND ' : ' OR ');
	return [where, values];
};

const showQuery = (sql: string, values: any[]) => console.log(sql, values);

export const sqlEjecutar = async ({ sql, values = [] }: sqlEjectType) => {
	showQuery(sql, values || []);
	const conn = await connection();
	const [results, fields] = await conn.query(sql, values || []);

	return results;
};

export const sqlSelect = async ({
	table,
	columns = [],
	query = {},
	sort = {},
	limit = NaN,
	offset = NaN,
	conditions = [],
	condInclusives = false,
	q = NaN,
	pageNumber = NaN,
	pageSize = NaN,
	asArray = false,
}: sqlSelectType) => {
	const filters = [];
	const values = [];

	let strTableName = table;

	if (table.includes('fn_')) {
		strTableName += `(
			${Object.values(query)
				.map((value) => {
					values.push(value);
					return `?`;
				})
				.join(', ')}
		)`;
	} else {
		const [strWhere, valsWhere] = getWhereClause(query);

		if (valsWhere.length > 0) {
			filters.push(strWhere);
			values.push(...valsWhere);
		}
	}

	let sql: string = `SELECT 
	${columns.length !== 0 ? columns.join(', ') : '*'}
	FROM ${strTableName}`;

	if (conditions.length > 0) {
		const [strConditions, valsConditions] = getConditionsWhere(
			conditions,
			condInclusives
		);
		filters.push(`(${strConditions})`);
		values.push(...valsConditions);
	}

	if (q) {
		const [strQ, valsQ] = await getFilterWhere(table, q);
		filters.push(`(${strQ})`);
		values.push(...valsQ);
	}

	const sortClause = getSortClause(sort);

	if (filters.length > 0) {
		sql += ` WHERE ${filters.join(' AND ')}`;
	}

	if (sortClause) {
		sql += ` ORDER BY ${sortClause}`;
	}

	if (pageNumber && pageSize) {
		sql += ` LIMIT ${pageSize} OFFSET ${pageNumber * pageSize}`;
	} else {
		if (limit) {
			sql += ` LIMIT ${limit}`;
		}

		if (offset) {
			sql += ` OFFSET ${offset}`;
		}
	}

	logger({
		dirname: __dirname,
		proc: 'sqlSelect',
		message: JSON.stringify({ sql, values }),
	});

	const conn = await connection(asArray);
	const [results, fields] = await conn.query(sql, values);
	conn.end();
	return results;
};

export const sqlSelectOne = async ({
	table,
	columns = [],
	query = {},
	sort = {},
	conditions = [],
	condInclusives = false,
}: sqlSelectType) => {
	const results: any = await sqlSelect({
		table,
		columns,
		query,
		sort,
		limit: 1,
		offset: 0,
		conditions,
		condInclusives,
	});
	return results[0];
};

export const sqlInsert = async ({ table, datos }: sqlInsertType) => {
	const keys = Object.keys(datos);
	const values = Object.values(datos);

	const sql: string = `INSERT INTO ${table} 
	(${keys.join(', ')}) 
	VALUES (${keys.map(() => `?`).join(', ')})`;

	logger({
		dirname: __dirname,
		proc: 'sqlInsert',
		message: JSON.stringify({ sql, values }),
	});

	const conn = await connection();
	const [results, fields] = await conn.query(sql, values);
	conn.end();
	return results;
};

export const sqlInsertMany = async ({ table, datos }: sqlInsertManyType) => {
	const keys = Object.keys(datos[0]);
	const values = datos.map((dato) => Object.values(dato));

	const sql: string = `INSERT 
	INTO ${table} 
	(${keys.join(', ')}) 
	VALUES ?`;

	logger({
		dirname: __dirname,
		proc: 'sqlManyInsert',
		message: JSON.stringify({ sql, values }),
	});

	const conn = await connection();
	const [results, fields] = await conn.query(sql, [values]);
	conn.end();
	return results;
};

export const sqlUpdate = async ({ table, datos, query }: sqlUpdateType) => {
	const [strSet, valsSet] = getSetClause(datos);

	const [strWhere, valsWhere] = getWhereClause(query);

	let sql: string = `UPDATE ${table}
	SET ${strSet}
	WHERE ${strWhere}`;

	logger({
		dirname: __dirname,
		proc: 'sqlUpdate',
		message: JSON.stringify({ sql, values: [...valsSet, ...valsWhere] }),
	});

	const conn = await connection();
	const [results, fields] = await conn.query(sql, [...valsSet, ...valsWhere]);
	conn.end();
	return results;
};

export const sqlDelete = async ({ table, query }: sqlDeleteType) => {
	const [strWhere, valsWhere] = getWhereClause(query);

	const sql: string = `DELETE 
	FROM ${table} 
	WHERE ${strWhere}`;

	logger({
		dirname: __dirname,
		proc: 'sqlDelete',
		message: JSON.stringify({ sql, values: valsWhere }),
	});

	const conn = await connection();
	const [results, fields] = await conn.query(sql, valsWhere);
	conn.end();
	console.log('**********');
	console.log({ results, fields });
	console.log('**********');
	return results;
};

import { conectar } from '../config/mysql';
import { DATA_SOURCES } from '../config/vars.config';
import { logger } from '../utils/logger';
import { encriptarPassword } from '../utils/token';

export const cargarRolesTutor = async () => {
	const roles = [];
	roles.push({
		nombre: 'Administrador',
		descripcion: 'Personal encargado de administrar el sistema',
	});
	roles.push({
		nombre: 'Analitica',
		descripcion: 'Personal de soporte y soporte',
	});
	roles.push({
		nombre: 'Encargado',
		descripcion: 'Tutor encargado de una estación',
	});
	roles.push({
		nombre: 'Evaluador',
		descripcion: 'Tutor dedicado a evaluar a los estudiantes',
	});
	roles.push({
		nombre: 'Estudiante',
		descripcion: 'Usuario estudiante del sistema de tesis',
	});

	await sqlInsertMany({
		table: 'rol',
		datos: roles,
	});
};
export const crearUsuarioAdministrador = async () => {
	const adminPass = await encriptarPassword(DATA_SOURCES.ADMIN_PASSWORD);

	const adminUser = {
		nombre: 'Administrador',
		apellido: 'Derecho',
		genero: '-',
		correo: 'admin@derecho.cloud',
		pass: adminPass,
		direccion: 'Guatemala',
		fecha_nac: '2023-01-01',
		municipio: 1,
		carnet: '000000000',
		cui: '0000000000000',
		rol: 1,
	};

	const sql = `call sp_ut_crear_usuario(${Object.keys(adminUser)
		.map(() => '?')
		.join(',')})`;

	const conn = await conectar();

	conn.query(sql, Object.values(adminUser))
		.then((res) => {
			console.log('[Crear admin][Insertar]', res);
		})
		.catch((err) => {
			console.log('Error al crear usuario administrador', err.sqlMessage);
		});
};

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
	q?: any;
	pageNumber?: number;
	pageSize?: number;
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

const getConditionsWhere = (conditions: conditionsType[]) => {
	const values: any[] = [];
	const where = conditions
		.map((cond) => {
			values.push(cond.value);
			return `${cond.column} ${cond.operator} ?`;
		})
		.join(' OR ');
	return [where, values];
};

const showQuery = (sql: string, values: any[]) => console.log(sql, values);

export const sqlEjecutar = async (sql: string, values?: any[]) => {
	showQuery(sql, values || []);
	const conn = await conectar();
	const rows = await conn.query(sql, values || []);

	return rows;
};

export const sqlSelect = async ({
	table,
	columns = [],
	query = {},
	sort = {},
	limit = NaN,
	offset = NaN,
	conditions = [],
	q = NaN,
	pageNumber = NaN,
	pageSize = NaN,
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
	${columns ? columns.join(', ') : '*'}
	FROM ${strTableName}`;

	if (conditions.length > 0) {
		const [strConditions, valsConditions] = getConditionsWhere(conditions);
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

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, values);
	console.log('[sqlSelect][results]', results);
	return results;
};

export const sqlSelectOne = ({
	table,
	columns = [],
	query = {},
	sort = {},
}: sqlSelectType) => {
	return sqlSelect({
		table,
		columns,
		query,
		sort,
		limit: 1,
		offset: 0,
	});
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

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, values);
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
		proc: 'sqlInsert',
		message: JSON.stringify({ sql, values }),
	});

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, [values]);
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
		proc: 'sqlInsert',
		message: JSON.stringify({ sql, values: [...valsSet, ...valsWhere] }),
	});

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, [...valsSet, ...valsWhere]);
	return results;
};

export const sqlDelete = async ({ table, query }: sqlDeleteType) => {
	const [strWhere, valsWhere] = getWhereClause(query);

	const sql: string = `DELETE 
	FROM ${table} 
	WHERE ${strWhere}`;

	logger({
		dirname: __dirname,
		proc: 'sqlInsert',
		message: JSON.stringify({ sql, values: valsWhere }),
	});

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, valsWhere);
	return results;
};

import { conectar } from '../config/mysql';
import { DATA_SOURCES } from '../config/vars.config';
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

type formarOrdenType = {
	[key: string]: 'ASC' | 'DESC';
};

type sqlSelectType = {
	table: string;
	columns: string[];
	conditions: Object;
	orden: formarOrdenType;
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
	conditions: Object;
};

type sqlDeleteType = {
	table: string;
	conditions: Object;
};

const formarWhere = (conditions: Object) => {
	const keys = Object.keys(conditions);
	const values = Object.values(conditions);

	const str =
		keys.length > 0
			? `WHERE ${keys.map((key) => `${key} = ?`).join(' AND ')}`
			: '';
	return { str, values };
};

const formarOrdenamiento = (orden: formarOrdenType) => {
	if (orden === undefined) return '';
	const entries = Object.entries(orden);

	const str =
		entries.keys.length > 0
			? `ORDER BY ${entries
					.map(([key, values]) => `${key} ${values}`)
					.join(', ')}`
			: '';
	return str;
};

const formarUpdateSet = (datos: Object) => {
	const keys = Object.keys(datos);
	const values = Object.values(datos);

	const str =
		keys.length > 0
			? `SET ${keys.map((key) => `${key} = ?`).join(', ')}`
			: '';
	return { str, values };
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
	columns,
	conditions,
	orden,
}: sqlSelectType) => {
	const clausula_where = formarWhere(conditions);
	const clausula_orden = formarOrdenamiento(orden);

	const sql: string = `SELECT 
	${columns.length !== 0 ? columns.join(', ') : '*'} 
	FROM ${table} 
	${clausula_where.str}
	${clausula_orden}`;

	showQuery(sql, [...clausula_where.values]);

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, [...clausula_where.values]);
	console.log('[sqlSelect][results]', results);
	return results;
};

export const sqlInsert = async ({ table, datos }: sqlInsertType) => {
	const keys = Object.keys(datos);
	const values = Object.values(datos);

	const sql: string = `INSERT 
	INTO ${table} 
	(${keys.join(', ')}) 
	VALUES (${keys.map(() => `?`).join(', ')})`;

	showQuery(sql, values);

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

	showQuery(sql, [values]);

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, [values]);
	return results;
};

export const sqlUpdate = async ({
	table,
	datos,
	conditions,
}: sqlUpdateType) => {
	const clausula_set = formarUpdateSet({ datos, anterior: 0 });
	const clausula_where = formarWhere({
		conditions,
		anterior: clausula_set.values.length,
	});

	const sql: string = `UPDATE ${table} 
	${clausula_set.str} 
	${clausula_where.str}`;

	showQuery(sql, [...clausula_set.values, ...clausula_where.values]);

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, [
		...clausula_set.values,
		...clausula_where.values,
	]);
	return results;
};

export const sqlDelete = async ({ table, conditions }: sqlDeleteType) => {
	const clausula_where = formarWhere({
		conditions: conditions || {},
		anterior: 0,
	});

	const sql: string = `DELETE 
	FROM ${table} 
	${clausula_where.str}`;

	showQuery(sql, [...clausula_where.values]);

	const conn = await conectar();
	const [results, fields] = await conn.query(sql, [...clausula_where.values]);
	return results;
};

import promisePool from '../config/db';

const generarInsert = (tabla: string, datos: Object) => {
	let columnas = Object.keys(datos);
	let valores = Object.values(datos);
	let sql = `INSERT INTO ${tabla} (${columnas.join(
		', '
	)}) VALUES (${valores.join(', ')})`;
	return [sql, valores];
};

export const insertar = async (tabla: string, datos: object) => {
	let sql = generarInsert(tabla, datos);
	return await promisePool.query(sql[0], sql[1]);
};

export const consultar = async (tabla: string, campos: string[]) => {
	let sql = `SELECT ${campos.join(', ')} FROM ${tabla}`;
	return await promisePool.query(sql);
};

export const consultarPorId = async (
	tabla: string,
	campos: string[],
	id: number
) => {
	let sql = `SELECT ${campos.join(', ')} FROM ${tabla} WHERE id = ${id}`;
	return await promisePool.query(sql);
};

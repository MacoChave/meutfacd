import { createConnection } from 'mysql2/promise';
import { DATA_SOURCES } from './vars.config';

export const connection = async (asArray: boolean = false) => {
	return await createConnection({
		host: DATA_SOURCES.DB_HOST,
		user: DATA_SOURCES.DB_USER,
		password: DATA_SOURCES.DB_PASS,
		database: DATA_SOURCES.DB_NAME,
		port: DATA_SOURCES.DB_PORT,
		connectionLimit: DATA_SOURCES.DB_CONN_LIMIT,
		connectTimeout: 10000,
		rowsAsArray: asArray,
	});
};

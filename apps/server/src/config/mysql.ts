import { createConnection, createPool } from 'mysql2/promise';
import { DATA_SOURCES } from './vars.config';

export async function conectar() {
	const connection = await createPool({
		host: DATA_SOURCES.DB_HOST,
		user: DATA_SOURCES.DB_USER,
		password: DATA_SOURCES.DB_PASS,
		database: DATA_SOURCES.DB_NAME,
		port: DATA_SOURCES.DB_PORT,
	})
	return connection
}

export const connection = async () => {
	return await createConnection({
		host: DATA_SOURCES.DB_HOST,
		user: DATA_SOURCES.DB_USER,
		password: DATA_SOURCES.DB_PASS,
		database: DATA_SOURCES.DB_NAME,
		port: DATA_SOURCES.DB_PORT,
	});
};

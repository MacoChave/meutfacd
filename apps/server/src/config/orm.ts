import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DATA_SOURCES } from './vars.config';

const AppDataSource = new DataSource({
	type: 'mysql',
	host: DATA_SOURCES.DB_HOST,
	port: DATA_SOURCES.DB_PORT,
	username: DATA_SOURCES.DB_USER,
	password: DATA_SOURCES.DB_PASS,
	database: DATA_SOURCES.DB_NAME,
	entities: [__dirname + '/../entities/*.ts'],
	timezone: 'America/Guatemala',
	logging: true,
	connectTimeout: 10000,
});

export default AppDataSource;

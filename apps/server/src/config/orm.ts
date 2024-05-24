import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DATA_SOURCES } from './vars.config';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: DATA_SOURCES.DB_HOST,
	username: DATA_SOURCES.DB_USER,
	password: DATA_SOURCES.DB_PASS,
	database: DATA_SOURCES.DB_NAME,
	port: DATA_SOURCES.DB_PORT,
	timezone: 'America/Guatemala',
	entities: [__dirname + '/../entities/*.ts'],
	logging: true,
	connectTimeout: 10000,
});

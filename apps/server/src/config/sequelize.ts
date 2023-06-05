import { Sequelize } from 'sequelize';
import { DATA_SOURCES } from './vars.config';

const sequelize = new Sequelize(
	DATA_SOURCES.DB_NAME,
	DATA_SOURCES.DB_USER,
	DATA_SOURCES.DB_PASS,
	{
		host: DATA_SOURCES.DB_HOST,
		port: DATA_SOURCES.DB_PORT,
		dialect: 'mysql',
		// dialectOptions: {
		// 	ssl: {
		// 		rejectUnauthorized: true,
		// 	},
		// },
		define: {
			timestamps: false,
		},
	}
);

export default sequelize;

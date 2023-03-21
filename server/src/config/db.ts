import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
	process.env.DB_NAME || 'db_meutfacd',
	process.env.DB_USER || 'root',
	process.env.DB_PASS || '',
	{
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT || 3306),
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

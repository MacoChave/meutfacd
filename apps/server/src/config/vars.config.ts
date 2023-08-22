export const DATA_SOURCES = {
	PORT: process.env.PORT || 3000,
	AUTH_HOST: process.env.AUTH_HOST || '',
	AUTH_PORT: process.env.AUTH_PORT || '4000',
	DB_CONN_LIMIT: Number(process.env.DB_CONN_LIMIT) || 4,
	DB_NAME: process.env.DB_NAME || 'db_meutfacd',
	DB_USER: process.env.DB_USER || 'root',
	DB_PASS: process.env.DB_PASS || '',
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: Number(process.env.DB_PORT) || 3306,
	ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin123.',
	TOKEN_SECRET: process.env.TOKEN_SECRET || 'secret',
	TOKEN_EXPIRES: process.env.TOKEN_EXPIRES || '12h',
	SALT: Number(process.env.SALT) || 10,
	MAIL_HOST: process.env.MAIL_HOST || '',
	MAIL_PORT: process.env.MAIL_PORT || '',
	AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
	AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION || '',
	AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY || '',
	AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
};

console.log('DATA_SOURCES', DATA_SOURCES);

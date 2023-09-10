import { logger } from '../utils/logger';

export const DATA_SOURCES = {
	PORT: Number(process.env.PORT) || 5000,
	JWT_SECRET: process.env.JWT_SECRET || 'meutfacd',
	JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: Number(process.env.DB_PORT) || 3306,
	DB_NAME: process.env.DB_NAME || 'dev_meutdb',
	DB_USER: process.env.DB_USER || 'root',
	DB_PASS: process.env.DB_PASS || 'root',
	DB_CONN_LIMIT: Number(process.env.DB_CONN_LIMIT) || 4,
	SALT: Number(process.env.SALT) || 10,
	EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'meut',
	EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || 'info@gmail.com',
	EMAIL_SMTP_DOMAIN_MAILGUN:
		process.env.EMAIL_SMTP_DOMAIN_MAILGUN || 'smtp.gmail.com',
	EMAIL_SMTP_API_MAILGUN: Number(process.env.EMAIL_SMTP_API_MAILGUN) || 587,
	AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'AWS_BUCKET_NAME',
	AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION || 'AWS_BUCKET_REGION',
	AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY || 'AWS_PUBLIC_KEY',
	AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || 'AWS_SECRET_KEY',
};

logger({
	dirname: __dirname,
	proc: 'DATA_SOURCES',
	message: DATA_SOURCES,
});

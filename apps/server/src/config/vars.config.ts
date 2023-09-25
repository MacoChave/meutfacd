import { logger } from '../utils/logger';

export const DATA_SOURCES = {
	PORT: Number(process.env.PORT) || 5000,
	URL_FRONTEND: process.env.URL_FRONTEND || 'localhost:5173',
	URL_EMAIL_VERIFIED:
		process.env.URL_EMAIL_VERIFIED || 'localhost:5173/email-verified',
	URL_PASS_RECOVERY:
		process.env.URL_PASS_RECOVERY || 'localhost:5173/recovery',
	JWT_SECRET: process.env.JWT_SECRET || 'meutfacd',
	JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: Number(process.env.DB_PORT) || 3306,
	DB_NAME: process.env.DB_NAME || 'dev_meutdb',
	DB_USER: process.env.DB_USER || 'root',
	DB_PASS: process.env.DB_PASS || 'root',
	DB_CONN_LIMIT: Number(process.env.DB_CONN_LIMIT) || 4,
	SALT: Number(process.env.SALT) || 10,
	SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
	SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
	SMTP_USERNAME: process.env.SMTP_USERNAME || 'SMTP_USERNAME',
	SMPT_PASSWORD: process.env.SMPT_PASSWORD || 'SMPT_PASSWORD',
	SMTP_SENDER: process.env.SMTP_SENDER || 'SMTP_SENDER',
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

import nodemailer, { SentMessageInfo } from 'nodemailer';
import { DATA_SOURCES } from '../config/vars.config';
import { TSendEmail } from '../models/email';

export const emailSender = async ({
	to,
	subject,
	plainText,
	content,
}: TSendEmail): Promise<SentMessageInfo> => {
	let transporter = nodemailer.createTransport({
		host: DATA_SOURCES.SMTP_HOST,
		port: DATA_SOURCES.SMTP_PORT,
		secure: true,
		auth: {
			user: DATA_SOURCES.SMTP_USERNAME,
			pass: DATA_SOURCES.SMPT_PASSWORD,
		},
	});

	let info: SentMessageInfo = await transporter.sendMail({
		from: DATA_SOURCES.SMTP_USERNAME,
		to: to,
		subject: subject,
		text: plainText,
		html: content,
	});

	return info;
};

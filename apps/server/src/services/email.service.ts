import { readFileSync } from 'fs';
import { DATA_SOURCES } from '../config/vars.config';
import { ISendEmail } from '../interfaces/parameters';
import { IReturnEmail } from '../interfaces/returns';
import { emailSender } from '../utils/email';
import { logger } from '../utils/logger';
import { SentMessageInfo } from 'nodemailer';

export const sendEmail = async ({
	to,
	subject,
	template,
	replaceValues,
}: ISendEmail): Promise<IReturnEmail> => {
	try {
		let html = readFileSync(
			`${__dirname}/../utils/pdf/${template}`,
			'utf-8'
		);

		for (let key in replaceValues) {
			html = html.replace(`{{${key}}}`, replaceValues[key]);
		}

		if (DATA_SOURCES.SEND_EMAIL == 'true') {
			const result: SentMessageInfo = await emailSender({
				to,
				plainText: 'Correo de la unidad de tesis',
				subject,
				content: html,
			});

			logger({
				dirname: __dirname,
				proc: 'sendEmail',
				message: result,
			});

			return {
				accepted: result.accepted,
				rejected: result.rejected,
				messageId: result.messageId,
			};
		}

		return {
			accepted: typeof to === 'string' ? [to] : to,
			rejected: [],
			messageId: '0',
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

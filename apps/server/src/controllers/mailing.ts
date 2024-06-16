import { Request, Response } from 'express';
import { errorHttp, successHttp } from '../utils/error.handle';
import { getBodyFromActivity, emailSender } from '../utils/email';
import { readFileSync } from 'fs';

export const sendInfoEmail = async ({ body, user }: Request, res: Response) => {
	try {
		await emailSender({
			to: body.tutor,
			plainText: body.description,
			subject: body.subject,
			content: getBodyFromActivity({
				username: body.username,
				description: body.description,
				title: body.title,
				action: 'comentado',
			}),
		});
		res.status(200).json({
			msg: 'Correo enviado',
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const sendTemplate = async ({ body, user }: Request, res: Response) => {
	try {
		let data = body;
		let receiver = data.receiver;
		let subject = data.subject;
		let action = data.action;

		delete data.action;
		delete data.receiver;
		delete data.subject;

		console.log(data);

		let html = readFileSync(
			`${__dirname}/../utils/pdf/${action}.html`,
			'utf-8'
		);

		Object.entries(data).forEach(([key, value]) => {
			html = html.replace(new RegExp(`{{${key}}}`, 'g'), value as string);
		});

		console.log(html);

		const result = await emailSender({
			to: receiver as string,
			plainText: 'Correo de la unidad de tesis',
			subject: subject as string,
			content: html,
		});
		successHttp(res, 200, result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

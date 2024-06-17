import { Request, Response } from 'express';
import { IReturnEmail } from '../interfaces/returns';
import { sendEmail } from '../services/email.service';
import { errorHttp, successHttp } from '../utils/error.handle';

export const sendInfoEmail = async ({ body, user }: Request, res: Response) => {
	try {
		const sender: IReturnEmail = await sendEmail({
			to: body.tutor,
			subject: body.subject,
			template: 'activity-request.html',
			replaceValues: {
				name: body.username,
				date: new Date().toLocaleDateString(),
				title: body.title,
				description: body.description,
			},
		});

		if (sender.accepted.length == 0)
			throw new Error('No se pudo enviar el correo');

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

		const result: IReturnEmail = await sendEmail({
			to: receiver,
			subject,
			template: `${action}.html`,
			replaceValues: data,
		});

		successHttp(res, 200, result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

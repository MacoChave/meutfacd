import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { getBodyFromActivity, sendEmail } from '../utils/email';

export const sendInfoEmail = async ({ body, user }: Request, res: Response) => {
	try {
		await sendEmail({
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
		errorHttp(res, {
			error,
			msg: 'No se puede enviar el correo',
			code: 500,
		});
	}
};

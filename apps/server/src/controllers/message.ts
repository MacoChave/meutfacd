import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlInsert, sqlSelect } from '../db/consultas';

// GET MESSAGE
export const getMessage = async ({ query }: Request, res: Response) => {
	try {
		const result = await sqlSelect({
			table: 'ut_message',
			query,
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede crear el mensaje',
			code: 500,
		});
	}
};

// CREATE MESSAGE
export const createMessage = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const result = await sqlInsert({
			table: 'ut_message',
			datos: {
				id_emisor: user.primaryKey,
				texto: body.texto,
				id_chat: query.id_chat,
			},
		});
		res.status(200).json({ message: 'Mensaje enviado' });
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede crear el mensaje',
			code: 500,
		});
	}
};

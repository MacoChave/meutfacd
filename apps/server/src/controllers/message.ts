import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlEjecutar, sqlInsert, sqlSelect } from '../db/consultas';

// CREATE MESSAGE
export const createMessage = async ({ body, user }: Request, res: Response) => {
	try {
		const result = await sqlInsert({
			table: 'ut_message',
			datos: { ...body, autor: user.primaryKey },
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

// GET MESSAGE
export const getMessage = async ({ query }: Request, res: Response) => {
	try {
		const result = await sqlEjecutar({
			sql: `select 
	um.* , 
	u.nombre 
from ut_message um 
inner join usuario u 
	on um.autor = u.id_usuario 
where um.id_chat = ?`,
			values: [query.id_chat],
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

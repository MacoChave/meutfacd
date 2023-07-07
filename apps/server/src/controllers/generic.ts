import { Request, Response, response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlSelect } from '../db/consultas';

export const getItem = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const responses = await sqlSelect({
			...body,
			...query,
		});
		res.status(200).json(responses);
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

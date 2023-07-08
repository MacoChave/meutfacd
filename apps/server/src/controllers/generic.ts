import { Request, Response } from 'express';
import { sqlSelect, sqlSelectOne } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getItems = async (
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

export const getItem = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const response = await sqlSelectOne({
			...body,
			...query,
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

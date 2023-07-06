import { Request, Response, response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlSelect } from '../db/consultas';

export const getItem = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const responses = await sqlSelect({
			table: body.table,
			columns: body.columns,
			conditions: body.conditions ?? {
				id_estudiante: user?.primaryKey,
				...query,
			},
			orden: body.orden ?? {},
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

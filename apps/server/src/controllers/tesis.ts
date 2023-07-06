import { Request, Response } from 'express';
import { sqlInsert, sqlSelect } from '../db/consultas';
import { logger } from '../utils/logger';
import { errorHttp } from '../utils/error.handle';

// export const uploadTesisDraft = (
// 	{ body, user, files }: Request,
// 	res: Response
// ) => {
// 	logger({
// 		dirname: __dirname,
// 		proc: 'uploadTesisDraft',
// 		message: JSON.stringify({ body, user, files }),
// 	});
// 	res.json({ message: 'Tesis guardada' });
// };

export const getTesis = ({ query }: Request, res: Response) => {
	try {
		const results = sqlSelect({
			table: 'ut_v_tesis',
			columns: [],
			conditions: query,
			orden: {},
		});
	} catch (error) {}
};

export const postTesis = ({ body, user }: Request, res: Response) => {
	try {
		const results = sqlInsert({
			table: 'ut_tesis',
			datos: { ...body, id_estudiante: user.primaryKey },
		});
		res.status(200).json({ message: 'Tesis guardada', results });
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
			code: 500,
		});
	}
};

export const getRevisionHistory = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		console.log(user);
		const responses = await sqlSelect({
			table: 'ut_v_revision_history',
			columns: body.columns,
			conditions: body.conditions ?? {
				id_estudiante: user?.primaryKey,
				...query,
			},
			orden: body.orden ?? {},
		});
		console.log(responses);
		res.status(200).json(responses);
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el historial',
			code: 500,
		});
	}
};

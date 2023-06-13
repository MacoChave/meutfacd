import { Request, Response } from 'express';
import { sqlSelect } from '../db/consultas';
import { logger } from '../utils/logger';

export const uploadTesisDraft = (
	{ body, user, file }: Request,
	res: Response
) => {
	console.log({ body, user, file });
	res.json({ message: 'Tesis guardada' });
};

export const getRevisionHistory = async (
	{ body, user }: Request,
	res: Response
) => {
	try {
		console.log(user);
		const responses = await sqlSelect({
			table: 'ut_v_revision_history',
			columns: body.columns,
			conditions: body.conditions ?? {
				id_estudiante: user?.primaryKey,
			},
			orden: body.orden ?? {},
		});
		console.log(responses);
		res.json(responses);
	} catch (error) {
		logger({
			dirname: __dirname,
			proc: 'getRevisionHistory',
			message: `${error}`,
		});
		res.status(500).json({
			error: 'Ha ocurrido un error de nuestra parte',
		});
	}
};

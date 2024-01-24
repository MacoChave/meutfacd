import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlEjecutar } from '../db/consultas';

export const getItems = async ({ user, query }: Request, res: Response) => {
	try {
		let sql = `call ut_sp_get_user_per_pages(?, ? ,?)`;
		let rows: any = await sqlEjecutar({
			sql,
			values: [query.rol, query.page, query.status],
		});
		res.status(200).json(rows[0]);
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

export const getBySchedule = async (
	{ user, query }: Request,
	res: Response
) => {
	try {
		let sql = `call ut_sp_get_user_per_schedule(?, ? ,?, ?, ?)`;
		let rows: any = await sqlEjecutar({
			sql,
			values: [
				query.rol,
				query.page,
				query.status,
				query.horario,
				query.jornada,
			],
		});
		res.status(200).json(rows[0]);
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

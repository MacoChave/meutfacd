import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import {
	sqlDelete,
	sqlEjecutar,
	sqlInsert,
	sqlSelect,
	sqlUpdate,
} from '../db/consultas';

export const getItem = ({ body, query }: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlSelect({
			...body,
			query,
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = async ({ body, query }: Request, res: Response) => {
	try {
		let datos = Object.assign({}, body);
		const result = await sqlInsert({
			table: 'ut_curso_tutor',
			datos,
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		console.log(body, query);
		const result = await sqlEjecutar({
			sql: `UPDATE ut_curso_tutor
				SET salon = ?, dias = JSON_ARRAY(?), fecha = ?
				WHERE id_curso_tutor = ?`,
			values: [body.salon, body.dias, body.fecha, query.id_curso_tutor],
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const updateSalon = async (
	{ user, body, query }: Request,
	res: Response
) => {
	try {
		const result = await sqlUpdate({
			table: 'ut_curso_tutor',
			datos: { salon: body.salon },
			query: { id_curso_tutor: query.id_curso_tutor },
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'ut_curso_tutor',
			query,
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

import { Request, Response } from 'express';
import { sqlInsert, sqlSelect, sqlSelectOne, sqlUpdate } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const result = await sqlSelectOne({
			...body,
			query: { id_estudiante: user.primaryKey, ...query },
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el registro',
			code: 500,
		});
	}
};

export const getItems = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlSelect({
			...body,
			query: { id_estudiante: user.primaryKey, ...query },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el registro',
			code: 500,
		});
	}
};

export const postItem = async ({ body }: Request, res: Response) => {
	try {
		const results = await sqlInsert({
			table: 'ut_asignacion',
			datos: body,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
			code: 500,
		});
	}
};

export const putItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlUpdate({
			table: 'ut_asignacion',
			query,
			datos: body,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
			code: 500,
		});
	}
};

export const deleteItem = ({ query }: Request, res: Response) => {
	try {
		const results = sqlUpdate({
			table: 'ut_asignacion',
			query,
			datos: { estado: 0 },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
			code: 500,
		});
	}
};

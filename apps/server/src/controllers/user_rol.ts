import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlDelete, sqlInsert, sqlSelect, sqlUpdate } from '../db/consultas';

export const getItem = ({ query, body, user }: Request, res: Response) => {
	res.status(200).json({ message: 'OK' });
	try {
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItems = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlSelect({
			table: 'ut_v_rol',
			query: { id_usuario: user.primaryKey },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const postItem = async ({ body, user }: Request, res: Response) => {
	try {
		const results = await sqlInsert({
			table: 'usuario_rol',
			datos: body,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const putItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlUpdate({
			table: 'usuario_rol',
			datos: body,
			query: query,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const deleteItem = ({ query, user }: Request, res: Response) => {
	try {
		const results = sqlDelete({
			table: 'usuario_rol',
			query: query,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

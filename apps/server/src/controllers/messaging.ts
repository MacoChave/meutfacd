import { Request, Response } from 'express';
import { sqlSelect, sqlSelectOne } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getItem = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const response = await sqlSelectOne({
			table: 'ut_notificacion',
			query: { id_receptor: user.primaryKey },
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const response = await sqlSelect({
			table: 'ut_notificacion',
			query: { id_receptor: user.primaryKey },
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = async ({ body, query }: Request, res: Response) => {
	try {
		const response = await sqlSelect({
			table: 'ut_notificacion',
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		const response = await sqlSelect({
			table: 'ut_notificacion',
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ body, query }: Request, res: Response) => {
	try {
		const response = await sqlSelect({
			table: 'ut_notificacion',
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

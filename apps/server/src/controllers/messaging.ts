import { Request, Response } from 'express';
import {
	sqlDelete,
	sqlInsert,
	sqlSelect,
	sqlSelectOne,
	sqlUpdate,
} from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getItem = async ({ query, user }: Request, res: Response) => {
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

export const getItems = async ({ query, user }: Request, res: Response) => {
	try {
		const response = await sqlSelect({
			table: 'ut_v_notification',
			query: { ...query, id_receptor: user.primaryKey },
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = async ({ body, user }: Request, res: Response) => {
	try {
		const response = await sqlInsert({
			table: 'ut_notificacion',
			datos: {
				...body,
			},
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		const response = await sqlUpdate({
			table: 'ut_notificacion',
			datos: body,
			query,
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ query }: Request, res: Response) => {
	try {
		const response = await sqlDelete({
			table: 'ut_notifcacion',
			query,
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import {
	sqlDelete,
	sqlInsert,
	sqlSelect,
	sqlSelectOne,
	sqlUpdate,
} from '../db/consultas';

export const getItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlSelectOne({
			table: 'ut_jornada',
			query,
			...body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, { error: error as any, msg: '', code: 500 });
	}
};

export const getItems = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlSelect({
			table: 'ut_jornada',
			query,
			...body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, { error: error as any, msg: '', code: 500 });
	}
};

export const createItem = async ({ body }: Request, res: Response) => {
	try {
		const result = await sqlInsert({
			table: 'ut_jornada',
			datos: body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, { error: error as any, msg: '', code: 500 });
	}
};

export const updateItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlUpdate({
			table: 'ut_jornada',
			query,
			datos: body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, { error: error as any, msg: '', code: 500 });
	}
};

export const deleteItem = async ({ query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'ut_jornada',
			query,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, { error: error as any, msg: '', code: 500 });
	}
};

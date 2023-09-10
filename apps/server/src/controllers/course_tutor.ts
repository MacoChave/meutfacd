import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlDelete, sqlInsert, sqlSelect } from '../db/consultas';

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

export const putItem = ({ body, query }: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'OK' });
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

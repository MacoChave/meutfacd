import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlInsert } from '../db/consultas';

export const getItem = ({ body, query }: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = ({ body, query }: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = async ({ body, query }: Request, res: Response) => {
	try {
		let datos = Object.assign({}, body);
		delete datos.fecha;
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

export const deleteItem = ({ body, query }: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

import { Request, Response } from 'express';
import { errorHttp, successHttp } from '../utils/error.handle';
import { getAllCurso, getOneCurso } from '../services/curso.service';
import { IGetAll } from '../interfaces/parameters';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		console.log(`Obtener curso ${params.id}`);
		const user = await getOneCurso(Number(params.id ?? '0'));
		successHttp(res, 200, user);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ query }: Request, res: Response) => {
	try {
		let params: IGetAll = query;
		let user = await getAllCurso(params);

		successHttp(res, 200, user);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = ({ body, query }: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'OK' });
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

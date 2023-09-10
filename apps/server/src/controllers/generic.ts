import { Request, Response } from 'express';
import {
	sqlInsert,
	sqlInsertMany,
	sqlSelect,
	sqlSelectOne,
	sqlUpdate,
} from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getItem = async ({ body, query }: Request, res: Response) => {
	try {
		const response = await sqlSelectOne({
			...body,
			query,
		});
		res.status(200).json(response);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

export const getItems = async ({ body, query }: Request, res: Response) => {
	try {
		const responses = await sqlSelect({
			...body,
			...query,
		});
		res.status(200).json(responses);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

export const createItem = async ({ body }: Request, res: Response) => {
	try {
		const response = await sqlInsert({
			table: body.table,
			datos: body.datos,
		});
		res.status(200).json(response);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

export const createItems = async ({ body }: Request, res: Response) => {
	try {
		const response = await sqlInsertMany({
			table: body.table,
			datos: body.datos,
		});
		res.status(200).json(response);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlUpdate({
			table: body.table,
			datos: body.datos,
			query,
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el item',
			code: 500,
		});
	}
};

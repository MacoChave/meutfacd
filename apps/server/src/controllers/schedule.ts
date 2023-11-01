import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import {
	sqlDelete,
	sqlEjecutar,
	sqlInsert,
	sqlSelect,
	sqlUpdate,
} from '../db/consultas';

export const getItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlSelect({
			table: 'ut_horario',
			query,
			...body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlEjecutar({
			sql: `SELECT h.*, j.nombre jornada FROM ut_horario h JOIN ut_jornada j ON h.id_jornada = j.id_jornada`,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const createItem = async ({ body }: Request, res: Response) => {
	try {
		const result = await sqlInsert({
			table: 'ut_horario',
			datos: body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const updateItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlUpdate({
			table: 'ut_horario',
			query,
			datos: body,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'ut_horario',
			query,
		});
		return res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

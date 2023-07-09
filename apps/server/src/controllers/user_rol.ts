import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlUpdate } from '../db/consultas';

export const getItem = ({ query, body, user }: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el registro',
			code: 500,
		});
	}
};

export const getItems = ({ query, body, user }: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el registro',
			code: 500,
		});
	}
};

export const postItem = ({ body, user }: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede crear el registro',
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
			table: 'usuario_rol',
			datos: body,
			query: query,
		});
		res.status(200).json(results);
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede actualizar el registro',
			code: 500,
		});
	}
};

export const deleteItem = ({ query, user }: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, {
			error,
			msg: 'No se puede eliminar el registro',
			code: 500,
		});
	}
};

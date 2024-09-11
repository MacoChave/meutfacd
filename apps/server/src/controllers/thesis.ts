import { Request, Response } from 'express';
import { sqlSelect, sqlSelectOne } from '../db/consultas';
import { IQueryAll } from '../interfaces/returns';
import { createOrUpdate, getAll, getOne } from '../services/tesis.service';
import { errorHttp, successHttp } from '../utils/error.handle';
import { UTTesis } from '../entities/Tesis';

export const getItem = async ({ params, user }: Request, res: Response) => {
	try {
		const results = await getOne(Number(params.id ?? 0));
		successHttp(res, 200, results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItems = async ({ query, user }: Request, res: Response) => {
	try {
		const results: IQueryAll = await getAll(query);
		successHttp(res, 200, results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const postItem = async ({ body, user }: Request, res: Response) => {
	try {
		console.log({ body, user });

		let result: UTTesis = await createOrUpdate({
			titulo: `${body.titulo}`,
			ruta_perfil: `${body.name}`,
			id_estudiante: user.primaryKey,
		});

		successHttp(res, 200, result);
		// const results = await sqlInsert({
		// 	table: 'ut_tesis',
		// 	datos: { ...body, id_estudiante: user.primaryKey },
		// });
		// res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const putItem = async ({ body, user }: Request, res: Response) => {
	try {
		// const results = await sqlUpdate({
		// 	table: 'ut_tesis',
		// 	query: { id_estudiante: user.primaryKey },
		// 	datos: body,
		// });
		// res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const deleteItem = async ({ query, user }: Request, res: Response) => {
	try {
		// const results = await sqlUpdate({
		// 	table: 'ut_tesis',
		// 	query,
		// 	datos: { estado: 'I' },
		// });
		// res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

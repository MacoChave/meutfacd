import { Request, Response } from 'express';
import { sqlDelete, sqlInsert, sqlSelect, sqlUpdate } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getItem = ({ query, params }: Request, res: Response) => {
	try {
		let { user, rol } = query;
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItems = async ({ query, params }: Request, res: Response) => {
	try {
		// let take = query.take ?? 10;
		// let skip = query.skip ?? 0;
		// let q = query?.q ?? '';

		// let userRolRepo = AppDataSource.getRepository(UserRol);
		// let [result, total] = await userRolRepo.findAndCount({
		// 	relations: ['user', 'rol'],
		// 	where: [],
		// 	order: {},
		// 	take: +take,
		// 	skip: +skip,
		// });

		// let next = +skip + +take;

		// successHttp(res, 200, {
		// 	data: result,
		// 	next: next < total ? next : undefined,
		// });
		const response = await sqlSelect({
			...query,
			table: 'usuario_rol',
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const postItem = async ({ body, user }: Request, res: Response) => {
	try {
		const results = await sqlInsert({
			table: 'usuario_rol',
			datos: body,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
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
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const deleteItem = ({ query, user }: Request, res: Response) => {
	try {
		const results = sqlDelete({
			table: 'usuario_rol',
			query: query,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

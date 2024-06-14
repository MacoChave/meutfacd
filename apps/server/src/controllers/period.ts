import { Request, Response } from 'express';
import { sqlDelete, sqlInsert, sqlUpdate } from '../db/consultas';
import { errorHttp, successHttp } from '../utils/error.handle';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		// let id = params.id ?? 0;

		// let periodRepo = AppDataSource.getRepository(Period);
		// let result = await periodRepo.findOne({
		// 	relations: ['schedules'],
		// 	where: {
		// 		id_jornada: +id,
		// 	},
		// });
		// successHttp(res, 200, result);
		successHttp(res, 200, {});
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ query }: Request, res: Response) => {
	try {
		// let take = query.take ?? 10;
		// let skip = query.skip ?? 0;

		// let periodRepo = AppDataSource.getRepository(Period);
		// let [result, total] = await periodRepo.findAndCount({
		// 	relations: [],
		// 	where: [],
		// 	take: +take,
		// 	skip: +skip,
		// });

		// let next = +skip + +take;

		// successHttp(res, 200, {
		// 	data: result,
		// 	nextCursor: next < total ? next : undefined,
		// });
		successHttp(res, 200, {});
	} catch (error) {
		errorHttp(res, error as any);
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
		errorHttp(res, error as any);
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
		errorHttp(res, error as any);
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
		errorHttp(res, error as any);
	}
};

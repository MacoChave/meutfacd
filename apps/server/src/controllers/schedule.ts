import { Request, Response } from 'express';
import AppDataSource from '../config/orm';
import { sqlDelete, sqlInsert, sqlSelect, sqlUpdate } from '../db/consultas';
import { Schedule } from '../entities/Schedule';
import { errorHttp, successHttp } from '../utils/error.handle';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		let { period, schedule } = params;

		let scheduleRepo = AppDataSource.getRepository(Schedule);
		let result = await scheduleRepo.findOne({
			relations: ['id_jornada'],
			where: {
				id_jornada: +period,
				id_horario: +schedule,
			},
		});
		successHttp(res, 200, result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ query }: Request, res: Response) => {
	try {
		let take = query.take ?? 10;
		let skip = query.skip ?? 0;
		let q = query?.q ?? '';

		let scheduleRepo = AppDataSource.getRepository(Schedule);
		let [result, total] = await scheduleRepo.findAndCount({
			relations: [],
			where: [],
			order: {
				hora_inicio: 'ASC',
			},
			take: +take,
			skip: +skip,
		});

		let next = +skip + +take;

		successHttp(res, 200, {
			data: result,
			nextCursor: next < total ? next : undefined,
		});
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

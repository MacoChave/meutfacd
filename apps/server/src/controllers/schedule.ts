import { Request, Response } from 'express';
import { sqlDelete, sqlInsert, sqlUpdate } from '../db/consultas';
import { UTHorario } from '../entities/Horario';
import { IQueryAll } from '../interfaces/returns';
import { getAllByPeriod, getAllHorario } from '../services/horario.service';
import { errorHttp, successHttp } from '../utils/error.handle';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		// let { period, schedule } = params;

		// let scheduleRepo = AppDataSource.getRepository(Schedule);
		// let result = await scheduleRepo.findOne({
		// 	relations: ['id_jornada'],
		// 	where: {
		// 		id_jornada: +period,
		// 		id_horario: +schedule,
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
		let result: IQueryAll = await getAllHorario(query);

		successHttp(res, 200, result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItemsByPeriod = async (
	{ params: { id_jornada } }: Request,
	res: Response
) => {
	try {
		let result: UTHorario[] = await getAllByPeriod(+id_jornada);

		successHttp(res, 200, result);
	} catch (error: any) {
		errorHttp(res, error.message);
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

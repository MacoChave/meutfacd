import { Request, Response } from 'express';
import AppDataSource from '../config/orm';
import { sqlDelete, sqlInsert, sqlUpdate } from '../db/consultas';
import { CourseTutor } from '../entities/CourseTutor';
import { errorHttp, successHttp, verifyOrm } from '../utils/error.handle';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		// verifyOrm();

		// let { id } = params;

		// let courseTutorRepo = AppDataSource.getRepository(CourseTutor);
		// let result = await courseTutorRepo.findOne({
		// 	relations: ['tutor', 'course', 'schedule', 'schedule.period'],
		// 	where: { id_curso_tutor: +id },
		// });

		successHttp(res, 200, {});
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ query }: Request, res: Response) => {
	try {
		// let take = query.take ?? 10;
		// let skip = query.skip ?? 0;
		// let q = query?.q ?? undefined;

		// let courseTutorRepo = AppDataSource.getRepository(CourseTutor);
		// let [result, total] = await courseTutorRepo.findAndCount({
		// 	relations: ['tutor', 'course', 'schedule', 'schedule.period'],
		// 	where: [],
		// 	order: {
		// 		fecha: 'DESC',
		// 		id_curso: 'ASC',
		// 	},
		// 	take: +take,
		// 	skip: +skip,
		// });

		// let next = +skip + +take;
		// successHttp(res, 200, {
		// 	data: result,
		// 	next: next < total ? next : undefined,
		// });
		successHttp(res, 200, {});
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = async ({ body, query }: Request, res: Response) => {
	try {
		let datos = Object.assign({}, body);
		const result = await sqlInsert({
			table: 'ut_curso_tutor',
			datos,
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		// const daysJSON: string = `("${body.dias.replace(',', '","')}")`;
		let daysJSON = JSON.parse(body.dias);
		console.log({ daysJSON });

		const result2 = await sqlUpdate({
			table: 'ut_curso_tutor',
			datos: {
				salon: body.salon,
				dias: JSON.stringify(daysJSON),
				fecha: body.fecha,
			},
			query: { id_curso_tutor: query.id_curso_tutor },
		});

		// const result = await sqlEjecutar({
		// 	sql: `UPDATE ut_curso_tutor
		// 	SET salon = ?, dias = JSON_ARRAY(?), fecha = ?
		// 	WHERE id_curso_tutor = ?`,
		// 	values: [body.salon, daysJSON, body.fecha, query.id_curso_tutor],
		// });
		res.status(200).json(result2);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const updateSalon = async (
	{ user, body, query }: Request,
	res: Response
) => {
	try {
		const result = await sqlUpdate({
			table: 'ut_curso_tutor',
			datos: { salon: body.salon },
			query: { id_curso_tutor: query.id_curso_tutor },
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'ut_curso_tutor',
			query,
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { sqlInsert, sqlSelect, sqlSelectOne, sqlUpdate } from '../db/consultas';
import { getAll, getAllByUser, getOne } from '../services/revision.service';
import { errorHttp, successHttp } from '../utils/error.handle';
import { formatDate } from '../utils/formats';

export const getXlsxReport = async (
	{ body, query }: Request,
	res: Response
) => {
	try {
		const bookName: string = 'StudentReview';
		const filePath: string = 'src/storage/StudentReview.xlsx';
		const data = await sqlSelect({
			table: 'ut_v_revision',
			...body,
			columns: [
				'tutor',
				'carnet',
				'nombre',
				'correo',
				'salon',
				'fecha_curso',
			],
			query,
		});

		const ws = XLSX.utils.json_to_sheet(data as any);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, bookName);
		XLSX.writeFile(wb, filePath);

		res.status(200).download(filePath, `${bookName}.xlsx`, (err) => {
			if (err) throw err;
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItemsByTutor = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const { id_usuario } = query;
		successHttp(res, 200, {});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItemByUser = async ({ query }: Request, res: Response) => {
	try {
		const { id_revision, id_usuario, estacion } = query;
		const review = await getOne(id_revision, id_usuario, estacion);

		successHttp(res, 200, review);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItemsByUser = async (
	{ query, user }: Request,
	res: Response
) => {
	try {
		const { id_user } = query;
		const reviews = await getAllByUser(id_user ?? user.primaryKey);

		successHttp(res, 200, reviews);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const { estacion, id_usuario, id_revision } = query;

		const result = await getOne(
			id_revision ?? undefined,
			id_usuario ?? user.primaryKey,
			estacion
		);
		console.log({ result });

		successHttp(res, 200, result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItems = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlSelect({
			...body,
			query: { id_usuario: user.primaryKey, ...query },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const postItem = async ({ body, user }: Request, res: Response) => {
	try {
		const result = await sqlSelectOne({
			table: 'ut_tesis',
			columns: ['id_tesis'],
			query: { id_estudiante: user.primaryKey },
		});

		const results = await sqlInsert({
			table: 'ut_revision',
			datos: {
				...body,
				id_tesis: body.id_tesis ? body.id_tesis : result.id_tesis,
			},
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const assignReview = async ({ query, body }: Request, res: Response) => {
	try {
		const id_reviews: number[] = body.id_revisiones;
		const id_tutor: number = body.id_tutor;
		// For each id_review, update the id_tutor
		const results = [];
		for await (const id_review of id_reviews) {
			results.push(
				await sqlUpdate({
					table: 'ut_revision',
					query: { id_revision: id_review },
					datos: {
						id_tutor,
						estado: 'V',
						fecha: formatDate({
							date: new Date(),
							format: 'mysql',
							type: 'datetime',
						}),
					},
				})
			);
		}
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
		console.log({ query, body, user });

		successHttp(res, 200, {});
		// let data = Object.assign({}, body);
		// if (data.id_tutor === 0) data.id_tutor = user.primaryKey;

		// const results = await sqlUpdate({
		// 	table: 'ut_revision',
		// 	query,
		// 	datos: {
		// 		fecha: formatDate({
		// 			date: new Date(),
		// 			format: 'mysql',
		// 			type: 'datetime',
		// 		}),
		// 		...data,
		// 	},
		// });
		// res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const deleteItem = async ({ query, user }: Request, res: Response) => {
	try {
		const results = await sqlUpdate({
			table: 'ut_revision',
			query,
			datos: { estado: 'D' },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

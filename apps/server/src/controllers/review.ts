import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { sqlInsert, sqlSelect, sqlSelectOne, sqlUpdate } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { formatDate } from '../utils/formats';

export const getXlsxReport = async ({ query }: Request, res: Response) => {
	try {
		const results = await sqlSelect({
			table: 'ut_v_revision',
		});

		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(results as any);
		XLSX.utils.book_append_sheet(wb, ws, 'StudentsReview');
		XLSX.writeFile(wb, './src/storage/students-revisions.xlsx');

		res.status(200).sendFile('students-revisions.xlsx', {
			root: './src/storage',
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			},
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItemsByCurrentProf = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlSelect({
			...body,
			table: 'ut_v_revision',
			query: { id_tutor: user.primaryKey, ...query },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const result = await sqlSelectOne({
			...body,
			query: { id_usuario: user.primaryKey, ...query },
		});
		res.status(200).json(result);
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
		const results = await Promise.all(
			id_reviews.map((id_revision) =>
				sqlUpdate({
					table: 'ut_revision',
					query: { id_revision },
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
			)
		);
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
		let data = Object.assign({}, body);
		if (data.id_tutor === 0) data.id_tutor = user.primaryKey;

		const results = await sqlUpdate({
			table: 'ut_revision',
			query,
			datos: {
				fecha: formatDate({
					date: new Date(),
					format: 'mysql',
					type: 'datetime',
				}),
				...data,
			},
		});
		res.status(200).json(results);
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

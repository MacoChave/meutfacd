import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { sqlInsert, sqlSelect, sqlSelectOne, sqlUpdate } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

export const getExcelFile = async (req: Request, res: Response) => {
	try {
		const professor = await sqlSelect({
			table: 'ut_v_usuarios',
			conditions: [
				{ column: 'roles', operator: 'like', value: '%curso%' },
			],
		});
		const workSheet = XLSX.utils.json_to_sheet(professor as any[]);
		const workBook = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(workBook, workSheet, 'profesores');
		XLSX.writeFile(workBook, 'storage/ut_asignacion.xlsx');

		res.status(200).sendFile('ut_asignacion.xlsx', {
			root: './storage',
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			},
		});
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el archivo',
			code: 500,
		});
	}
};

export const getItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const result = await sqlSelectOne({
			...body,
			query: { id_estudiante: user.primaryKey, ...query },
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el registro',
			code: 500,
		});
	}
};

export const getItems = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const results = await sqlSelect({
			...body,
			query: { id_estudiante: user.primaryKey, ...query },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener el registro',
			code: 500,
		});
	}
};

export const postItem = async ({ body }: Request, res: Response) => {
	try {
		const results = await sqlInsert({
			table: 'ut_asignacion',
			datos: body,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
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
			table: 'ut_asignacion',
			query,
			datos: body,
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
			code: 500,
		});
	}
};

export const deleteItem = ({ query }: Request, res: Response) => {
	try {
		const results = sqlUpdate({
			table: 'ut_asignacion',
			query,
			datos: { estado: 0 },
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede guardar el progreso',
			code: 500,
		});
	}
};

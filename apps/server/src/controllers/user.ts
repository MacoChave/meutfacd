import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { sqlDelete, sqlSelect, sqlUpdate } from '../db/consultas';
import { errorHttp, successHttp } from '../utils/error.handle';
import { formatDate, newDate } from '../utils/formats';
import { encryptPassword } from '../utils/token';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { readFile, utils } from 'xlsx';
import { AppDataSource } from '../config/orm';
import { Municipality } from '../entities/Municipality';
import { createConnection } from 'typeorm';
import { Department } from '../entities/Department';

const getItem = async ({ params }: Request, res: Response) => {
	try {
		const { carnet } = params;
		res.json({ message: 'Obtener usuario', carnet });
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const getItems = async (req: Request, res: Response) => {
	try {
		const results = await sqlSelect({
			table: 'ut_v_usuarios',
			columns: ['*'],
			query: {},
			sort: {},
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const getPaginatedItems = async ({ body, query }: Request, res: Response) => {
	try {
		let conn = await AppDataSource.initialize();
		let result = await conn.getRepository(Department).find({
			relations: ['municipios'],
			cache: true,
		});
		successHttp(res, 200, result);
	} catch (error: any) {
		errorHttp(res, error);
	} finally {
		AppDataSource.close();
	}
};

const bulkInsert = async (req: Request, res: Response) => {
	try {
		if (!req.files || !req.files.file)
			throw new Error('No se envió un archivo');

		const file = req.files.file as fileUpload.UploadedFile;
		const filePath = path.join(__dirname, '../storage', file.name);

		if (!existsSync(path.join(__dirname, '../storage'))) {
			mkdirSync(path.join(__dirname, '../storage'));
		}

		await file.mv(filePath);

		const workbook = readFile(filePath);
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		const data = utils.sheet_to_json(sheet);

		console.log(`Insertar ${data.length} datos`);

		unlinkSync(filePath);

		res.json({ message: 'Bulk insert' });
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const createItem = (req: Request, res: Response) => {
	res.json({ message: 'Crear usuario' });
};

const updateItem = async ({ body, query, user }: Request, res: Response) => {
	try {
		const results = await Promise.all([
			sqlUpdate({
				table: 'usuario',
				datos: {
					nombre: body.nombre,
					apellidos: body.apellidos,
					genero: body.genero,
					correo: body.correo,
					carnet: body.carnet,
					cui: body.cui,
					direccion: body.direccion,
					fecha_nac: formatDate({
						date: newDate(body.fecha_nac, 'es'),
						format: 'mysql',
						type: 'date',
					}),
				},
				query: { id_usuario: user.primaryKey },
			}),
			sqlUpdate({
				table: 'ut_perfil',
				datos: {
					id_horario: body.id_horario,
					id_jornada: body.id_jornada,
				},
				query: { id_usuario: user.primaryKey },
			}),
		]);

		if (body.pass && body.pass.length > 0) {
			let passHash = await encryptPassword(body.pass);
			results.push(
				await sqlUpdate({
					table: 'usuario',
					datos: { pass: passHash },
					query: { id_usuario: user.primaryKey },
				})
			);
		}
		res.json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const deleteItem = async ({ query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'usuario',
			query,
		});
		res.status(400).json(result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export {
	updateItem,
	bulkInsert,
	createItem,
	deleteItem,
	getItem,
	getItems,
	getPaginatedItems,
};

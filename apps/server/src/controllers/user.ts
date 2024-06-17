import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import path from 'path';
import { readFile, utils } from 'xlsx';
import { DATA_SOURCES } from '../config/vars.config';
import { sqlDelete, sqlSelect, sqlUpdate } from '../db/consultas';
import { IGetAll } from '../interfaces/parameters';
import { IReturnEmail } from '../interfaces/returns';
import { sendEmail } from '../services/email.service';
import { allUser, createUser, oneUsuario } from '../services/usuario.service';
import { errorHttp, successHttp } from '../utils/error.handle';
import { formatDate, newDate } from '../utils/formats';
import { getRandomPassword } from '../utils/password';
import { encryptPassword } from '../utils/token';

const getItem = async ({ params }: Request, res: Response) => {
	try {
		const user = await oneUsuario(Number(params.id ?? '0'));
		successHttp(res, 200, user);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const getItems = async ({ body, query }: Request, res: Response) => {
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

const getAllUser = async ({ query }: Request, res: Response) => {
	try {
		let params: IGetAll = query;
		let user = await allUser(params);
		successHttp(res, 200, user);
	} catch (error: any) {
		errorHttp(res, error);
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

const createItem = async ({ body }: Request, res: Response) => {
	try {
		// TODO: Generar la contraseña
		let pass = getRandomPassword();
		let passHash = await encryptPassword(pass);

		console.table({ ...body, pass });

		const result: string = await createUser({
			...body,
			pass: passHash,
			id_municipio: 1,
		});

		const sended: IReturnEmail = await sendEmail({
			to: body.correo,
			subject: 'Se ha creado su cuenta en la unidad de tesis',
			template: 'account-created.html',
			replaceValues: {
				name: body.nombre,
				email: body.correo,
				password: pass,
				url: DATA_SOURCES.URL_EMAIL_VERIFIED,
			},
		});

		successHttp(res, 200, { result, sended });
	} catch (error: any) {
		errorHttp(res, error);
	}
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
	bulkInsert,
	createItem,
	deleteItem,
	getAllUser,
	getItem,
	getItems,
	updateItem,
};

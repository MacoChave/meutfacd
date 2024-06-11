import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { Like } from 'typeorm';
import { readFile, utils } from 'xlsx';
import AppDataSource from '../config/orm';
import { DATA_SOURCES } from '../config/vars.config';
import { sqlDelete, sqlEjecutar, sqlSelect, sqlUpdate } from '../db/consultas';
import { User } from '../entities/User';
import { sendEmail } from '../utils/email';
import { errorHttp, successHttp, verifyOrm } from '../utils/error.handle';
import { formatDate, newDate } from '../utils/formats';
import { logger } from '../utils/logger';
import { getRandomPassword } from '../utils/password';
import { encryptPassword } from '../utils/token';

const getItem = async ({ params }: Request, res: Response) => {
	try {
		let id = params.id ?? 0;

		let userRepo = AppDataSource.getRepository(User);
		let user = await userRepo.findOne({
			relations: [
				'id_municipio',
				'id_municipio.id_departamento',
				'roles',
				'profile',
				'profile.schedule',
				'profile.schedule.period',
			],
			where: { id_usuario: +id },
		});
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
		verifyOrm();

		let take = query.take ?? 10;
		let skip = query.skip ?? 0;
		let q = query?.q ?? '';

		let userRepo = AppDataSource.getRepository(User);
		let [result, total] = await userRepo.findAndCount({
			relations: [],
			where: [
				{ nombre: Like(`%${q}%`) },
				{ apellidos: Like(`%${q}%`) },
				{ correo: Like(`%${q}%`) },
			],
			order: { carnet: 'ASC' },
			take: +take,
			skip: +skip,
		});

		let next = +skip + +take;

		// successHttp(res, 200, result);
		successHttp(res, 200, {
			data: result,
			nextCursor: next < total ? next : undefined,
		});
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

		console.log({ pass, passHash });

		const newUser = {
			nombre: body.nombre,
			apellidos: body.apellidos,
			genero: body.genero,
			correo: body.correo,
			pass: passHash,
			direccion: body.direccion,
			fecha_nac: formatDate({
				date: newDate(body.fecha_nac, 'es'),
				format: 'mysql',
				type: 'date',
			}),
			id_municipio: 1,
			carnet: body.carnet,
			cui: body.cui,
			rol: body.id_rol,
		};

		const keys: string[] = Object.keys(newUser).map((key) => '?');
		keys.push(...['@error_code', '@error_message']);
		const values = Object.values(newUser).map((value) => value);

		// TODO: Ejecutar ut_sp_crear_usuario
		await sqlEjecutar({
			sql: `call ut_sp_crear_usuario(${keys.join(',')})`,
			values,
		});

		const [errorInfo]: any = await sqlEjecutar({
			sql: `select @error_code, @error_message`,
		});

		const { error_code, error_message } = errorInfo;

		console.log({ error_code, error_message });

		if (error_code && error_code !== 0) {
			throw new Error(error_message);
		}

		let html = readFileSync(
			`${__dirname}/../utils/pdf/confirm-email.html`,
			'utf-8'
		);

		html = html.replace('{{nombre}}', body.nombre);
		html = html.replace('{{url}}', DATA_SOURCES.URL_EMAIL_VERIFIED);

		if (DATA_SOURCES.SEND_EMAIL == 'true') {
			const result = await sendEmail({
				to: body.correo,
				plainText: 'Correo de la unidad de tesis',
				subject: 'Verificación de correo electrónico',
				content: html,
			});
			logger({
				dirname: __dirname,
				proc: 'logupHandler',
				message: result,
			});
		}

		successHttp(res, 200, { pass });
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

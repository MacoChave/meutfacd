import { Request, Response } from 'express';
import { DATA_SOURCES } from '../config/vars.config';
import { sqlEjecutar, sqlSelectOne, sqlUpdate } from '../db/consultas';
import { Usuario } from '../entities/Usuario';
import { IReturnEmail } from '../interfaces/returns';
import { TSignIn } from '../models/signIn';
import { sendEmail } from '../services/email.service';
import { userAuth } from '../services/usuario.service';
import { errorHttp, successHttp } from '../utils/error.handle';
import { formatDate } from '../utils/formats';
import { comparePassword, encryptPassword, generarToken } from '../utils/token';

const signIn = async ({ user, password }: TSignIn) => {
	try {
		const userData = await sqlSelectOne({
			table: 'ut_v_usuarios',
			columns: ['id_usuario', 'nombre', 'cui', 'carnet', 'roles', 'pass'],
			query: { correo: user },
		});

		if (!userData) {
			throw new Error('Usuario no encontrado');
		}

		const hashPassword = userData.pass;

		const isMatch = await comparePassword(password, hashPassword);

		if (!isMatch) {
			throw new Error('Contraseña incorrecta');
		}

		const token = generarToken({
			primaryKey: userData.id_usuario,
			cui: userData.cui,
			carnet: userData.carnet,
			roles: userData.roles,
		});

		return { token, name: userData.nombre, roles: userData.roles };
	} catch (error) {
		throw error;
	}
};

export const verifyEmail = async ({ query }: Request, res: Response) => {
	try {
		const response = await sqlUpdate({
			table: 'usuario',
			datos: { estado: 'C' },
			query: { correo: atob(query.email as string) },
		});

		return res.status(200).json(response);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const recoveryPassword = async ({ body }: Request, res: Response) => {
	try {
		if (!body.correo) throw new Error('Correo no especificado');

		const sended: IReturnEmail = await sendEmail({
			to: body.correo,
			subject: 'Recuperar contraseña',
			template: 'recovery-password.html',
			replaceValues: {
				email: Buffer.from(body.correo, 'base64').toString('utf-8'),
			},
		});

		if (sended.rejected.length) throw new Error('Correo no enviado');

		successHttp(
			res,
			200,
			'Revisa tu correo electrónico para recuperar tu contraseña'
		);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const setRandomPassowrd = async ({ query }: Request, res: Response) => {
	try {
		const { email } = query;
		if (!email) throw new Error('Correo no especificado');

		const user = await sqlSelectOne({
			table: 'usuario',
			columns: ['nombre', 'correo'],
			query: { correo: email },
		});

		if (!user) throw new Error('No se encontró el usuario con ese correo');

		const pass = Math.random().toString(36).slice(-8);
		const hash = await encryptPassword(pass);

		const result = await sqlUpdate({
			table: 'usuario',
			datos: { pass: hash },
			query: { correo: email },
		});

		const sended: IReturnEmail = await sendEmail({
			to: user.correo,
			subject: 'Nueva contraseña',
			template: 'pass-regenerated.html',
			replaceValues: {
				name: user.nombre,
				email: user.correo,
				password: pass,
			},
		});

		successHttp(res, 200, JSON.stringify({ ...result, pass }));
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const changePassword = async (
	{ query, body }: Request,
	res: Response
) => {
	try {
		const hash = await encryptPassword(body.pass);
		const response = await sqlUpdate({
			table: 'usuario',
			datos: { pass: hash },
			query: { correo: atob(query.email as string) },
		});
		res.status(200).json(response);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const logupHandler = async ({ body, query }: Request, res: Response) => {
	try {
		// Procesar datos de req.body
		const {
			nombre,
			apellido,
			genero,
			correo,
			pass,
			direccion,
			carnet,
			cui,
			fecha_nac,
		} = body;

		const { rol } = query;

		if (!rol) {
			throw new Error('Rol no especificado');
		}

		const rolFinded: any = await sqlEjecutar({
			sql: `SELECT id_rol FROM rol WHERE lower(nombre) like lower(?)`,
			values: [`${rol}%`],
		});

		if (!rolFinded.length) {
			throw new Error('Rol no encontrado');
		}

		const hash = await encryptPassword(pass);

		const usuario = {
			nombre,
			apellido,
			genero,
			correo,
			hash,
			direccion,
			fecha_nac: formatDate({
				date: new Date(fecha_nac),
				format: 'mysql',
				type: 'date',
			}),
			id_municipio: 1,
			carnet: +carnet.toString().replace(' ', ''),
			cui,
			rol: rolFinded[0].id_rol,
		};

		// Crear variables para almacenar en BD
		const keys: string[] = Object.keys(usuario).map((key) => '?');
		keys.push(...['@error_code', '@error_message']);
		const values = Object.values(usuario).map((value) => value);

		// Almacenar en BD
		await sqlEjecutar({
			sql: `call ut_sp_crear_usuario(${keys.join(',')})`,
			values,
		});

		const [errorInfo]: any = await sqlEjecutar({
			sql: `select @error_code, @error_message`,
		});

		console.log({ errorInfo });

		const { error_code, error_message } = errorInfo;

		if (error_code && error_code !== 0) {
			throw new Error(error_message);
		}

		// SEND EMAIL VERIFICATION TO USER
		const sended: IReturnEmail = await sendEmail({
			to: correo,
			subject: 'Verificación de correo electrónico',
			template: 'confirm-email.html',
			replaceValues: {
				username: nombre,
				email: correo,
				url: DATA_SOURCES.URL_EMAIL_VERIFIED,
			},
		});

		if (sended.rejected.length) throw new Error('Correo no enviado');

		res.status(200).json({ msg: 'Usuario creado' });
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const loginHandler = async ({ body }: Request, res: Response) => {
	try {
		if (!body.correo) throw new Error('Correo no especificado');
		if (!body.pass) throw new Error('Contraseña no especificada');

		let user: Usuario = await userAuth(body);

		const token = generarToken({
			primaryKey: user.id_usuario,
			carnet: user.carnet,
		});

		successHttp(res, 200, { token, name: user.nombre, roles: user.roles });
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const profileHandler = async ({ user }: Request, res: Response) => {
	try {
		const result = await sqlSelectOne({
			table: 'ut_v_usuarios',
			columns: [],
			query: { id_usuario: user.primaryKey },
		});

		if (!result) {
			throw new Error('No se encontró el usuario');
		}

		return res.status(200).json({
			fecha_nac: result.fecha_nac,
			genero: result.genero,
			direccion: result.direccion,
			id_municipio: result.id_municipio,
			nombre: result.nombre,
			apellidos: result.apellidos,
			correo: result.correo,
			estado: result.estado,
			carnet: result.carnet,
			cui: result.cui,
			roles: result.roles,
			id_jornada: result.id_jornada,
			id_horario: result.id_horario,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

import { Request, Response } from 'express';
import { sqlEjecutar, sqlSelectOne, sqlUpdate } from '../db/consultas';
import { TSignIn } from '../models/signIn';
import { errorHttp, successHttp } from '../utils/error.handle';
import { comparePassword, encryptPassword, generarToken } from '../utils/token';
import {
	getBodyFromRecovery,
	getBodyFromVerification,
	sendEmail,
} from '../utils/email';
import { DATA_SOURCES } from '../config/vars.config';
import { logger } from '../utils/logger';
import { formatDate } from '../utils/formats';
import { userAuth } from '../services/user.services';
import { Usuario } from '../entities/Usuario';

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
			datos: { estado: 'A' },
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
		if (DATA_SOURCES.SEND_EMAIL == 'true') {
			const emailData = await sendEmail({
				to: body.correo,
				plainText:
					'Ingresa al siguiente link para recuperar tu contraseña',
				subject: 'Recuperar contraseña',
				content: getBodyFromRecovery({
					email: body.correo,
				}),
			});
			logger({
				dirname: __dirname,
				proc: 'recoveryPassword',
				message: emailData,
			});
		} else {
			console.log(
				'Ingresa al siguiente link para recuperar tu contraseña'
			);
			console.log(
				`${DATA_SOURCES.URL_PASS_RECOVERY}/${btoa(body.correo)}`
			);
		}
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
			columns: ['correo'],
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

		if (DATA_SOURCES.SEND_EMAIL == 'true') {
			const emailData = await sendEmail({
				to: `${email}`,
				plainText: `Para el correo: ${email} tu contraseña es: ${pass}`,
				subject: 'Nueva contraseña',
				content: `Para el correo: ${email} tu contraseña es: ${pass}`,
			});
			logger({
				dirname: __dirname,
				proc: 'setRandomPassowrd',
				message: emailData,
			});
		} else {
			console.log(`${email}: ${pass}`);
		}

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
		if (DATA_SOURCES.SEND_EMAIL == 'true') {
			const emailData = await sendEmail({
				to: correo,
				plainText: 'Por favor, verifica tu correo electrónico',
				subject: 'Verificación de correo electrónico',
				content: getBodyFromVerification({
					username: nombre,
					email: correo,
				}),
			});
			logger({
				dirname: __dirname,
				proc: 'logupHandler',
				message: emailData,
			});
		}

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
		// const userData: TSignIn = {
		// 	user: body.correo,
		// 	password: body.pass,
		// };

		// // CONSULTA SIN MICROSERVICIO AUT
		// const result = await signIn(userData);

		// // CONSULTA A MICROSERVICIO AUTH
		// // const response = await axios.post(
		// // 	`${DATA_SOURCES.AUTH_HOST}:${DATA_SOURCES.AUTH_PORT}/login`,
		// // 	userData,
		// // 	{
		// // 		headers: {
		// // 			'Content-Type': 'application/json',
		// // 		},
		// // 	}
		// // );
		// // logger({
		// // 	dirname: __dirname,
		// // 	proc: 'loginHandler',
		// // 	message: response.data,
		// // });
		// res.status(200).json(result);
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

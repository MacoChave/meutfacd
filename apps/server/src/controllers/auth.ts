import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { sqlEjecutar, sqlSelectOne } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { logger } from '../utils/logger';
import { comparePassword, encryptPassword, generarToken } from '../utils/token';
import { TSignIn } from '../models/signIn';

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
	} catch (error) {}
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
			fecha_nac,
			id_municipio: 1,
			carnet,
			cui,
			rol: rolFinded[0].id_rol,
		};

		// Crear variables para almacenar en BD
		const keys: string[] = Object.keys(usuario).map((key) => '?');
		keys.push(...['@error_code', '@error_message']);
		const values = Object.values(usuario).map((value) => value);

		// Almacenar en BD
		await sqlEjecutar({
			sql: `call sp_ut_crear_usuario(${keys.join(',')})`,
			values,
		});

		const [errorInfo]: any = await sqlEjecutar({
			sql: `select @error_code, @error_message`,
		});

		const { error_code, error_message } = errorInfo;

		if (error_code && error_code !== 0) {
			throw new Error(error_message);
		}

		res.status(200).json({ msg: 'Usuario creado' });
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al crear usuario', error });
	}
};

//  TODO: Se podría eliminar este endpoint
export const loginHandler = async ({ body }: Request, res: Response) => {
	try {
		const userData: TSignIn = {
			user: body.correo,
			password: body.pass,
		};

		// CONSULTA SIN MICROSERVICIO AUT
		const result = await signIn(userData);

		// CONSULTA A MICROSERVICIO AUTH
		// const response = await axios.post(
		// 	`${DATA_SOURCES.AUTH_HOST}:${DATA_SOURCES.AUTH_PORT}/login`,
		// 	userData,
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	}
		// );
		// logger({
		// 	dirname: __dirname,
		// 	proc: 'loginHandler',
		// 	message: response.data,
		// });
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al iniciar sesión', error });
		// const { response, status } = error as AxiosError;
		// logger({
		// 	dirname: __dirname,
		// 	proc: 'loginHandler',
		// 	message: `${response?.data}`,
		// });
		// res.status(response?.status ?? 500).json(
		// 	response?.data ?? 'Se produjo un error al iniciar sesión'
		// );
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
		errorHttp(res, { msg: 'Error al obtener el perfil', error });
	}
};

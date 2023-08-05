import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { DATA_SOURCES } from '../config/vars.config';
import { sqlEjecutar, sqlSelectOne } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { logger } from '../utils/logger';
import { encriptarPassword } from '../utils/token';

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

		const hash = await encriptarPassword(pass);

		const rowRol: any = await sqlEjecutar({
			sql: `SELECT id_rol FROM rol WHERE lower(nombre) like lower(?)`,
			values: [`${rol}%`],
		});

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
			rol: rowRol[0].id_rol,
		};

		// Crear variables para almacenar en BD
		const values = Object.values(usuario).map((value) => value);

		// Almacenar en BD
		const usuarioNuevo: any = await sqlEjecutar({
			sql: `call sp_ut_crear_usuario(${Object.keys(usuario)
				.map((_value) => '?')
				.join(',')})`,
			values,
		});

		if (usuarioNuevo.affectedRows === 0) {
			errorHttp(res, {
				msg: 'Error al crear usuario',
				code: 400,
			});
			return;
		}

		res.status(200).json({ msg: 'Usuario creado' });
	} catch (error: any) {
		res.status(400).json({ msg: 'Error al crear usuario', error });
	}
};

//  TODO: Se podría eliminar este endpoint
export const loginHandler = async ({ body }: Request, res: Response) => {
	try {
		const userData = {
			user: body.correo,
			password: body.pass,
		};

		const response = await axios.post(
			`${DATA_SOURCES.AUTH_HOST}:${DATA_SOURCES.AUTH_PORT}/login`,
			userData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		logger({
			dirname: __dirname,
			proc: 'loginHandler',
			message: response.data,
		});
		res.status(200).json(response.data);
	} catch (error: any) {
		const { response, status } = error as AxiosError;
		logger({
			dirname: __dirname,
			proc: 'loginHandler',
			message: `${response?.data}`,
		});
		console.log(response?.data, response?.status);
		res.status(response?.status ?? 500).json(
			response?.data ?? 'Se produjo un error al iniciar sesión'
		);
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
			nombre: result.nombre,
			apellidos: result.apellidos,
			correo: result.correo,
			estado: result.estado,
			carnet: result.carnet,
			cui: result.cui,
			id_rol: result.id_rol,
			rol: result.rol,
		});
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al obtener el perfil', error });
	}
};

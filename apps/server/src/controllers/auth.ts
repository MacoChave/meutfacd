import { Request, Response } from 'express';
import { sqlEjecutar, sqlSelect } from '../db/consultas';
import { v_usuarios } from '../models/v_usuarios';
import { errorHttp } from '../utils/error.handle';
import { encriptarPassword } from '../utils/token';
import { DATA_SOURCES } from '../config/vars.config';
import axios, { AxiosError } from 'axios';
import { logger } from '../utils/logger';

export const logupHandler = async ({ body }: Request, res: Response) => {
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
			rol,
		} = body;

		const hash = await encriptarPassword(pass);

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
			rol: rol || 9,
		};

		// Crear variables para almacenar en BD
		const values = Object.values(usuario).map((value) => value);

		// Almacenar en BD
		const usuarioNuevo = await sqlEjecutar(
			`call sp_ut_crear_usuario(${Object.keys(usuario)
				.map((_value) => '?')
				.join(',')})`,
			values
		);

		console.log(`${__dirname} [logup]`, usuarioNuevo[0]);

		if (usuarioNuevo[0].affectedRows === 0) {
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
		const { response } = error as AxiosError;
		logger({
			dirname: __dirname,
			proc: 'loginHandler',
			message: `${response?.data}`,
		});
		console.log(error.response.data);
		res.status(error.response.status).json(error.response.data);
	}
};

export const profileHandler = async (req: Request, res: Response) => {
	try {
		const { primaryKey } = req.user;
		const response: v_usuarios[] = await sqlSelect({
			table: 'ut_v_usuarios',
			columns: [],
			query: { id_usuario: primaryKey },
			orden: {},
		});
		if (response.length === 0) {
			errorHttp(res, {
				msg: 'Error al obtener el perfil',
				code: 400,
			});
			return;
		}
		const currentUser: v_usuarios = response[0];
		return res.status(200).json({
			nombre: currentUser.nombre,
			apellidos: currentUser.apellidos,
			correo: currentUser.correo,
			estado: currentUser.estado,
			carnet: currentUser.carnet,
			cui: currentUser.cui,
			id_rol: currentUser.id_rol,
			rol: currentUser.rol,
		});
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al obtener el perfil', error });
	}
};

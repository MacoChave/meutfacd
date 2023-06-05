import { Request, Response } from 'express';
import { sqlEjecutar, sqlSelect } from '../db/consultas';
import Estudiante from '../models/estudiante';
import Profesor from '../models/profesor';
import Usuario from '../models/usuario';
import { errorHttp } from '../utils/error.handle';
import {
	compararPassword,
	encriptarPassword,
	generarToken,
} from '../utils/token';
import { v_usuarios } from '../models/v_usuarios';

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
		} = body;

		const hash = await encriptarPassword(pass);

		// Almacenar en BD
		const usuarioNuevo = await sqlEjecutar(
			`call sp_ut_crear_usuario(${Object.keys({
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
				rol: 2,
			})
				.map(() => '?')
				.join(',')})`
		);

		console.log('[Logup][Usuario]', usuarioNuevo);

		if (usuarioNuevo.affectedRows === 0) {
			errorHttp(res, {
				msg: 'Error al crear usuario',
				code: 400,
			});
			return;
		}

		res.status(200).json({ msg: 'Usuario creado' });
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al crear usuario', error });
	}
};

//  TODO: Se podría eliminar este endpoint
export const loginHandler = async ({ body }: Request, res: Response) => {
	const options = {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			user: body.correo,
			password: body.pass,
		}),
	};
	const response = await fetch('http://127.0.0.1:4000/login', options);
	console.log(
		'[auth.js][login]',
		response.status,
		response.statusText,
		response.ok
	);
	const { data } = await response.json();
	console.log('[auth.js][login]', data);
	return res.status(response.status).json(data);
};

export const profileHandler = async (req: Request, res: Response) => {
	try {
		const { primaryKey } = req.user;
		const response: v_usuarios[] = await sqlSelect({
			table: 'ut_v_usuarios',
			columns: [],
			conditions: { id_usuario: primaryKey },
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

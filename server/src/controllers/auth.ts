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

export const loginHandler = async ({ body }: Request, res: Response) => {
	try {
		// Procesar datos de req.body
		const { correo, pass } = body;
		// Validar datos -> express-validator, joi, zod, etc.
		// Validar en BD
		const usuarios: v_usuarios[] = await sqlSelect({
			table: 'ut_v_usuarios',
			columns: [],
			conditions: { correo },
			orden: {},
		});

		console.log('[Login][Usuarios]', usuarios);

		if (usuarios.length === 0) {
			errorHttp(res, {
				msg: 'El usuario no existe',
				code: 400,
			});
			return;
		}

		const usuario = usuarios[0];

		// Validar contraseña
		const validPassword = await compararPassword(pass, usuario.pass);
		if (!validPassword) {
			errorHttp(res, {
				msg: 'Contraseña incorrecta',
				code: 400,
			});
			return;
		}

		// Generar token
		let token = generarToken({
			cui: usuario.cui,
			carnet: usuario.carnet,
			primaryKey: usuario.id_usuario,
			rol: usuario.rol,
		});

		// Devolver token
		res.status(200).json({
			token,
			name: usuario.nombre,
			rol: usuario.rol,
		});
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al iniciar sesión', error });
	}
};

export const profileHandler = async (req: Request, res: Response) => {
	try {
		const { correo, rol } = req.user;
		const response = await Usuario.findOne({
			where: { correo },
			include: {
				model: rol ? Profesor : Estudiante,
			},
		});
		return res.status(200).json(response?.toJSON());
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al obtener el perfil', error });
	}
};

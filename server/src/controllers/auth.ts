import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import Usuario from '../models/usuario';
import {
	compararPassword,
	encriptarPassword,
	generarToken,
} from '../utils/token';
import Estudiante from '../models/estudiante';
import Profesor from '../models/profesor';
import Rol from '../models/rol';
import { buscarUsuario } from '../utils/auth.handler';

export const logupEstudianteHandler = async (
	{ body }: Request,
	res: Response
) => {
	try {
		// Procesar datos de req.body
		const {
			nombre,
			apellido,
			genero,
			correo,
			pass,
			carnet,
			cui,
			direccion,
			fecha_nac,
			telefono,
		} = body;

		// Validar datos -> express-validator, joi, zod, etc.
		// Validar en BD
		const usuario = await buscarUsuario({ carnet });

		if (usuario) {
			return res.status(400).json({
				msg: 'El usuario ya existe',
			});
		}
		// Encriptar contraseña
		const hash = await encriptarPassword(pass);

		// Almacenar en BD
		const usuarioNuevo = await Usuario.create({
			nombre,
			apellido,
			genero,
			correo,
			pass: hash,
			carnet,
			cui,
			direccion,
			fecha_nac,
			estado: 1,
			telefono,
		});

		const estudianteNuevo = await Estudiante.create({
			id_estudiante: usuarioNuevo.getDataValue('id_usuario'),
		});

		// Generar token
		let token = generarToken({ carnet, cui });

		// Devolver token
		res.status(200).json({ token, usuario: { nombre, correo, cui } });
	} catch (error: any) {
		handleHttp(res, { msg: 'Error al crear usuario', error });
	}
};

export const logupProfesorHandler = async (
	{ body }: Request,
	res: Response
) => {
	try {
		const {
			nombre,
			apellido,
			genero,
			correo,
			pass,
			carnet,
			cui,
			direccion,
			fecha_nac,
			telefono,
			id_rol,
		} = body;

		const usuario = await buscarUsuario({ carnet });

		if (usuario)
			return res.status(400).json({
				msg: 'El usuario ya existe',
			});

		const hash = await encriptarPassword(pass);

		const usuarioNuevo = await Usuario.create({
			nombre,
			apellido,
			genero,
			correo,
			pass: hash,
			carnet,
			cui,
			direccion,
			fecha_nac,
			estado: 1,
			telefono,
		});

		const profesorNuevo = await Profesor.create(
			{
				id_tutor: usuarioNuevo.getDataValue('id_usuario'),
				id_rol: id_rol || 2,
			},
			{
				include: {
					model: Rol,
					attributes: ['nombre'],
				},
			}
		);

		console.log('profesorNuevo', profesorNuevo.toJSON());

		let token = generarToken({
			carnet,
			cui,
			rol: profesorNuevo.getDataValue('id_rol'),
		});

		res.status(200).json({
			token,
			usuario: {
				nombre,
				correo,
				cui,
				id_rol: profesorNuevo.getDataValue('id_rol'),
			},
		});
	} catch (error: any) {
		handleHttp(res, { msg: 'Error al crear usuario', error });
	}
};

export const loginEstudianteHandler = async (
	{ body }: Request,
	res: Response
) => {
	try {
		// Procesar datos de req.body
		const { carnet, pass } = body;
		// Validar datos -> express-validator, joi, zod, etc.
		// Validar en BD
		const usuario = await buscarUsuario({ carnet });

		if (!usuario) {
			return res.status(400).json({
				msg: 'El usuario no existe',
			});
		}

		// Validar contraseña
		const validPassword = await compararPassword(
			pass,
			usuario.getDataValue('pass')
		);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Contraseña incorrecta',
			});
		}

		// Generar token
		let token = generarToken({ carnet, cui: usuario.getDataValue('cui') });

		// Devolver token
		res.status(200).json({
			token,
			usuario: {
				nombre: usuario.getDataValue('nombre'),
				correo: usuario.getDataValue('correo'),
				cui: usuario.getDataValue('cui'),
			},
		});
	} catch (error: any) {
		handleHttp(res, { msg: 'Error al iniciar sesión', error });
	}
};

export const loginProfesorHandler = async (
	{ body }: Request,
	res: Response
) => {
	try {
		const { carnet, pass } = body;

		const usuario = await buscarUsuario({ carnet });

		if (!usuario) {
			return res.status(400).json({
				msg: 'El usuario no existe',
			});
		}

		const profesor = await Profesor.findOne({
			include: {
				model: Rol,
				attributes: ['nombre'],
			},
			where: {
				id_tutor: usuario.getDataValue('id_usuario'),
			},
		});

		console.log('profeso', profesor?.toJSON());

		const token = generarToken({
			carnet,
			cui: usuario.getDataValue('cui'),
			rol: profesor?.getDataValue('id_rol') || 4,
		});

		res.status(200).json({
			token,
			usuario: {
				nombre: usuario.getDataValue('nombre'),
				correo: usuario.getDataValue('correo'),
				cui: usuario.getDataValue('cui'),
				id_rol: profesor?.getDataValue('id_rol') || 4,
			},
		});
	} catch (error: any) {
		handleHttp(res, { msg: 'Error al iniciar sesión', error });
	}
};

export const profileHandler = ({ body }: Request, res: Response) => {
	try {
		return res.status(200).json({ profile: body });
	} catch (error: any) {
		handleHttp(res, { msg: 'Error al obtener el perfil', error });
	}
};

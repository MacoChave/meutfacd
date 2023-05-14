import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
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
			errorHttp(res, {
				msg: 'El usuario ya existe',
				code: 400,
			});
			return;
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

		res.status(200).json({ msg: 'Usuario creado' });
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al crear usuario', error });
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

		if (usuario) {
			errorHttp(res, {
				msg: 'El usuario ya existe',
				code: 400,
			});
			return;
		}

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
			estado: 0,
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

		res.status(200).json({ msg: 'Usuario creado' });
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al crear usuario', error });
	}
};

export const loginEstudianteHandler = async (
	{ body }: Request,
	res: Response
) => {
	try {
		// Procesar datos de req.body
		const { correo, pass } = body;
		// Validar datos -> express-validator, joi, zod, etc.
		// Validar en BD
		const usuario = await buscarUsuario({ correo });

		if (!usuario) {
			errorHttp(res, {
				msg: 'El usuario no existe',
				code: 400,
			});
			return;
		}

		// Validar contraseña
		const validPassword = await compararPassword(
			pass,
			usuario.getDataValue('pass')
		);
		if (!validPassword) {
			errorHttp(res, {
				msg: 'Contraseña incorrecta',
				code: 400,
			});
			return;
		}

		const estudiante = await Estudiante.findOne({
			where: { id_estudiante: usuario.getDataValue('id_usuario') },
		});
		if (!estudiante) {
			errorHttp(res, {
				msg: 'El usuario no existe',
				code: 400,
			});
			return;
		}

		// Generar token
		let token = generarToken({
			carnet: correo,
			cui: usuario.getDataValue('cui'),
		});

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
		errorHttp(res, { msg: 'Error al iniciar sesión', error });
	}
};

export const loginProfesorHandler = async (
	{ body }: Request,
	res: Response
) => {
	try {
		const { correo, pass } = body;

		const usuario = await buscarUsuario({ correo });

		if (!usuario) {
			errorHttp(res, {
				msg: 'El usuario no existe',
				code: 400,
			});
			return;
		}

		const validPassword = await compararPassword(
			pass,
			usuario.getDataValue('pass')
		);
		if (!validPassword) {
			errorHttp(res, {
				msg: 'Contraseña incorrecta',
				code: 400,
			});
			return;
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
		if (!profesor) {
			errorHttp(res, {
				msg: 'El usuario no existe',
				code: 400,
			});
			return;
		}

		const token = generarToken({
			correo,
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
				rol: profesor.getDataValue('rol').nombre || '',
			},
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

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

const buscarUsuario = (carnet: number) => {
	return Usuario.findOne({
		where: {
			carnet,
		},
	});
};

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
		const usuario = await buscarUsuario(carnet);

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
		} = body;

		const usuario = await buscarUsuario(carnet);

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

		const profesorNuevo = await Profesor.create({
			id_profesor: usuarioNuevo.getDataValue('id_usuario'),
		});

		let token = generarToken({ carnet, cui });

		res.status(200).json({ token, usuario: { nombre, correo, cui } });
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
		const usuario = await Usuario.findOne({
			where: {
				carnet,
			},
		});

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

		const usuario = await Usuario.findOne({
			where: {
				carnet,
			},
		});
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
				id_profesor: usuario.getDataValue('id_usuario'),
			},
		});

		console.log('Profesor->', profesor?.dataValues);

		const token = generarToken({
			carnet,
			cui: usuario.getDataValue('cui'),
		});

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

export const profileHandler = (req: Request, res: Response) => {
	try {
		return res.status(200).json({ profile: req.user });
	} catch (error: any) {
		handleHttp(res, { msg: 'Error al obtener el perfil', error });
	}
};

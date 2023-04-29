import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import { handleHttp } from '../utils/error.handle';
import Rol from '../models/rol';

const obtenerItem = async ({ params }: Request, res: Response) => {
	try {
		const { carnet } = params;
		res.json({ message: 'Obtener usuario', carnet });
	} catch (error) {
		handleHttp(res, { error, msg: 'Error al obtener el usuario' });
	}
};

const obtenerItems = async (req: Request, res: Response) => {
	try {
		const results = await Usuario.findAll();
		res.status(200).json(results);
	} catch (error) {
		handleHttp(res, {
			error: error,
			msg: 'Error al obtener los usuarios',
		});
	}
};

const crearItem = (req: Request, res: Response) => {
	res.json({ message: 'Crear usuario' });
};

const actualizarItem = (req: Request, res: Response) => {
	res.json({ message: 'Actualizar usuario' });
};

const eliminarItem = (req: Request, res: Response) => {
	res.json({ message: 'Eliminar usuario' });
};

export { obtenerItem, obtenerItems, crearItem, actualizarItem, eliminarItem };

import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import { errorHttp } from '../utils/error.handle';
import { sqlSelect } from '../db/consultas';

const obtenerItem = async ({ params }: Request, res: Response) => {
	try {
		const { carnet } = params;
		res.json({ message: 'Obtener usuario', carnet });
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al obtener el usuario' });
	}
};

const obtenerItems = async (req: Request, res: Response) => {
	try {
		const results = await sqlSelect({
			table: 'usuario',
			columns: ['*'],
			query: {},
			sort: {},
		});
		res.status(200).json(results);
	} catch (error) {
		errorHttp(res, {
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

export { actualizarItem, crearItem, eliminarItem, obtenerItem, obtenerItems };

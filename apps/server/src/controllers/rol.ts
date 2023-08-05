import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlSelect } from '../db/consultas';

const obtenerItem = (req: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al obtener el item' });
	}
};

const obtenerItems = async ({ query, user }: Request, res: Response) => {
	try {
		const results = await sqlSelect({
			table: 'ut_v_rol',
		});
		res.status(200).json(results);
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al obtener los items' });
	}
};

const crearItem = (req: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al crear el item' });
	}
};

const actualizarItem = (req: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al actualizar el item' });
	}
};

const eliminarItem = (req: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al eliminar el item' });
	}
};

export { actualizarItem, crearItem, eliminarItem, obtenerItem, obtenerItems };

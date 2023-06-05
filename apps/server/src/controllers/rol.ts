import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import Rol from '../models/rol';

const obtenerItem = (req: Request, res: Response) => {
	try {
	} catch (error) {
		errorHttp(res, { error, msg: 'Error al obtener el item' });
	}
};

const obtenerItems = (req: Request, res: Response) => {
	try {
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

export { obtenerItem, obtenerItems, crearItem, actualizarItem, eliminarItem };

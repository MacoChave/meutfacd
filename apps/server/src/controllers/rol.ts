import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlSelect } from '../db/consultas';

const obtenerItem = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const obtenerItems = async ({ query, user }: Request, res: Response) => {
	try {
		const results = await sqlSelect({
			table: 'ut_v_rol',
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const crearItem = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const actualizarItem = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const eliminarItem = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export { actualizarItem, crearItem, eliminarItem, obtenerItem, obtenerItems };

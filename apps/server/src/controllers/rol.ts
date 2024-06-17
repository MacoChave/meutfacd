import { Request, Response } from 'express';
import { errorHttp, successHttp, verifyOrm } from '../utils/error.handle';
import { sqlSelect } from '../db/consultas';
import AppDataSource from '../config/orm';
import { Rol } from '../entities/Rol';
import { IGetAll } from '../interfaces/parameters';
import { allRoles } from '../services/rol.service';

const obtenerItem = (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const obtenerItems = async ({ query, user }: Request, res: Response) => {
	try {
		let params: IGetAll = query;
		let rol = await allRoles(params);
		successHttp(res, 200, rol);
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

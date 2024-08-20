import { Request, Response } from 'express';
import { IGetAll } from '../interfaces/parameters';
import {
	allRoles,
	createOrUpdateOne,
	deleteOne,
	getOne,
} from '../services/rol.service';
import { errorHttp, successHttp } from '../utils/error.handle';

const obtenerItem = async ({ params: { id } }: Request, res: Response) => {
	try {
		let rol = await getOne(+id);
		successHttp(res, 200, rol);
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

const crearItem = ({ body }: Request, res: Response) => {
	try {
		let roles = createOrUpdateOne(body);
		successHttp(res, 201, roles);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const actualizarItem = ({ body, params: { id } }: Request, res: Response) => {
	try {
		let roles = createOrUpdateOne({ ...body, id_rol: id });
		successHttp(res, 200, roles);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const eliminarItem = ({ params: { id } }: Request, res: Response) => {
	try {
		let isDeleted = deleteOne(+id);
		successHttp(res, 200, isDeleted);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export { actualizarItem, crearItem, eliminarItem, obtenerItem, obtenerItems };

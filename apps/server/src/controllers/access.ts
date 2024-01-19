import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlEjecutar, sqlSelect, sqlUpdate } from '../db/consultas';

export const getItem = ({ query, body, user }: Request, res: Response) => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getItems = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const result: any = await sqlEjecutar({
			sql: `select 
	uar.id_rol , r.nombre rol , 
	uar.id_pagina , up.nombre pagina , 
	uar.activo 
from ut_acceso_rol uar 
inner join rol r 
	on uar.id_rol = r.id_rol 
inner join ut_pagina up 
	on uar.id_pagina = up.id_pagina`,
		});

		let accesos = result.reduce((acc: any, item: any) => {
			const { id_rol, rol, id_pagina, pagina, activo } = item;
			if (!acc[rol]) {
				acc[rol] = [];
			}
			acc[rol].push({
				id_rol,
				rol,
				id_pagina,
				pagina,
				activo,
			});
			return acc;
		}, {});

		res.status(200).json(accesos);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const postItem = ({ query, body, user }: Request, res: Response) => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const updateItem = async (
	{ query, body, user }: Request,
	res: Response
) => {
	try {
		const result = await sqlUpdate({
			table: 'ut_acceso_rol',
			datos: body,
			query,
		});
		res.status(200).json(result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const deleteItem = ({ query, body, user }: Request, res: Response) => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

import { Request, Response } from 'express';
import { sqlEjecutar } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

const getItem = async ({ user }: Request, res: Response) => {
	try {
		console.log('user', user);
		const sql = `select 
	uperm.n_padre , uperm.n_hijo , 
	uperm.i_padre , uperm.i_hijo ,
	uperm.descripcion , uperm.ruta 
from ut_permiso up 
inner join (
	select 
		uph.id_pagina , 
		upp.nombre n_padre, uph.nombre n_hijo , 
		upp.indice i_padre, uph.indice i_hijo , 
		uph.descripcion , concat(upp.ruta, uph.ruta) ruta
	from ut_pagina upp  
	inner join ut_pagina uph 
		on upp.id_pagina = uph.id_padre
) uperm
	on up.id_pagina = uperm.id_pagina 
where up.id_usuario = ? 
and up.permiso = ?`;
		const rows: any = await sqlEjecutar({
			sql,
			values: [user.primaryKey, 1],
		});

		let menu = rows.reduce((acc: any, item: any) => {
			const { n_padre, n_hijo, i_padre, i_hijo, descripcion, ruta } =
				item;
			if (!acc[n_padre]) acc[n_padre] = [];
			acc[n_padre].push({
				n_padre,
				n_hijo,
				i_padre,
				i_hijo,
				descripcion,
				ruta,
			});
			return acc;
		}, {});

		res.status(200).json(menu);
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const getItems = async ({ user, query }: Request, res: Response) => {
	try {
		console.log({ user, query });
		const sql = `call ut_sp_get_pages_per_user(?)`;
		const rows: any = await sqlEjecutar({
			sql,
			values: [query.id_usuario],
		});

		const pages = rows[0].reduce((acc: any, item: any) => {
			const {
				idx_padre,
				id_padre,
				n_padre,
				idx_hijo,
				id_hijo,
				n_hijo,
				ruta,
				permiso,
				id_usuario,
				id_rol,
			} = item;
			if (!acc[n_padre]) acc[n_padre] = [];
			acc[n_padre].push({
				idx_padre,
				id_padre,
				n_padre,
				idx_hijo,
				id_hijo,
				n_hijo,
				ruta,
				permiso,
				id_usuario,
				id_rol,
			});
			return acc;
		}, {});

		res.status(200).json(pages);
	} catch (error: any) {
		console.log(error);
		errorHttp(res, error as any);
	}
};

const createItem = (res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const bulkInsert = (req: Request, res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const updateItem = (res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const bulkUpdate = (req: Request, res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const deleteItem = (res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

export {
	getItem,
	getItems,
	createItem,
	updateItem,
	deleteItem,
	bulkUpdate,
	bulkInsert,
};

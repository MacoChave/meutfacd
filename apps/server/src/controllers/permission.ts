import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlEjecutar } from '../db/consultas';

const getItem = ({ query, user }: Request, res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

const getItems = async ({ query, user }: Request, res: Response) => {
	console.log(user);
	try {
		const sql = `select 
	uperm.id_rol , uperm.id_pagina , 
	upag.nombre , upag.descripcion , 
	upag.indice , upag.ruta 
from ut_permiso uperm 
left join rol r 
	using (id_rol)
left join ut_pagina upag 
	using (id_pagina)
where r.id_rol in (
	select id_rol 
	from rol r2 
	left join usuario_rol ur 
	using (id_rol)
	where ur.id_usuario = ?
) ; `;
		const rows = await sqlEjecutar({ sql, values: [user.primaryKey] });
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

const createItem = ({ body }: Request, res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

const updateItem = ({ query, body }: Request, res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

const deleteItem = ({ query }: Request, res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export { getItem, getItems, createItem, updateItem, deleteItem };

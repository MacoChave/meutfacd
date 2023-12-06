import { Request, Response } from 'express';
import { sqlEjecutar } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';

const getItem = (res: Response) => {
	try {
		res.status(200).json({ msg: 'OK' });
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const getItems = async ({ user }: Request, res: Response) => {
	try {
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
where up.id_usuario = 2 
and up.id_rol = 37 
and up.permiso = 1`;
		const rows = await sqlEjecutar({ sql, values: [user.primaryKey, 1] });
		res.status(200).json(rows);
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

const updateItem = (res: Response) => {
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

export { createItem, deleteItem, getItem, getItems, updateItem };

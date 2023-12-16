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
		const rows = await sqlEjecutar({ sql, values: [user.primaryKey, 1] });
		res.status(200).json(rows);
	} catch (error: any) {
		errorHttp(res, error as any);
	}
};

const getItems = async ({ query }: Request, res: Response) => {
	try {
		console.log('query', query);

		const sql = `select 
	uph.id_pagina id_hijo , upp.id_pagina id_padre ,
	upp.nombre n_padre, uph.nombre n_hijo , 
	uph.descripcion , up.permiso , up.permiso 
from ut_permiso up 
inner join ut_pagina uph 
	on up.id_pagina = uph.id_pagina 
inner join ut_pagina upp 
	on uph.id_padre = upp.id_pagina 
where up.id_usuario = ?
	and upp.id_pagina in (
		select distinct uar.id_pagina
		from ut_acceso_rol uar 
		inner join usuario_rol ur  
			on uar.id_rol = ur.id_rol
		where uar.activo = ? 
		and uar.id_rol in (
			select distinct ur2.id_rol 
			from usuario_rol ur2 
			where ur2.id_usuario = ?
		)
	)`;
		const rows = await sqlEjecutar({
			sql,
			values: [query.id_usuario, 1, query.id_usuario],
		});
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

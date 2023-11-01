import { Request, Response } from 'express';
import { sqlDelete, sqlSelect, sqlUpdate } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { formatDate, newDate } from '../utils/formats';

const obtenerItem = async ({ params }: Request, res: Response) => {
	try {
		const { carnet } = params;
		res.json({ message: 'Obtener usuario', carnet });
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const obtenerItems = async (req: Request, res: Response) => {
	try {
		const results = await sqlSelect({
			table: 'ut_v_usuarios',
			columns: ['*'],
			query: {},
			sort: {},
		});
		res.status(200).json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const crearItem = (req: Request, res: Response) => {
	res.json({ message: 'Crear usuario' });
};

const actualizarItem = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const results = await Promise.all([
			sqlUpdate({
				table: 'usuario',
				datos: {
					nombre: body.nombre,
					apellidos: body.apellidos,
					genero: body.genero,
					correo: body.correo,
					carnet: body.carnet,
					cui: body.cui,
					direccion: body.direccion,
					fecha_nac: formatDate({
						date: newDate(body.fecha_nac, 'es'),
						format: 'mysql',
						type: 'date',
					}),
				},
				query: { id_usuario: user.primaryKey },
			}),
			sqlUpdate({
				table: 'ut_perfil',
				datos: {
					id_horario: body.id_horario,
					id_jornada: body.id_jornada,
				},
				query: { id_usuario: user.primaryKey },
			}),
		]);
		res.json(results);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const eliminarItem = async ({ query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'usuario',
			query,
		});
		res.status(400).json(result);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export { actualizarItem, crearItem, eliminarItem, obtenerItem, obtenerItems };

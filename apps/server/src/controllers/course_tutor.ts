import { Request, Response } from 'express';
import { sqlDelete, sqlUpdate } from '../db/consultas';
import { getOneCurso } from '../services/curso.service';
import {
	createOrUpdateCursoTutor,
	getAllCursoTutor,
} from '../services/curso_tutor.service';
import { errorHttp, successHttp } from '../utils/error.handle';
import { UTCursoTutor } from '../entities/CursoTutor';
import { getOneUsuario } from '../services/usuario.service';
import { UTCurso } from '../entities/Curso';
import { Usuario } from '../entities/Usuario';
import { getOneHorario } from '../services/horario.service';
import { UTHorario } from '../entities/Horario';

export const postItem = async ({ body }: Request, res: Response) => {
	try {
		// console.table(body);
		let data = new UTCursoTutor();

		data.salon = body.salon;
		data.dias = JSON.parse(body.dias);
		data.fecha = new Date(body.fecha);
		data.curso = (await getOneCurso(body.id_curso)) as UTCurso;
		data.tutor = (await getOneUsuario(body.id_tutor)) as Usuario;
		data.horario = (await getOneHorario(
			body.id_horario,
			body.id_jornada
		)) as UTHorario;
		data.id_horario = body.id_horario;
		data.id_jornada = body.id_jornada;

		const cursoTutor = await createOrUpdateCursoTutor(data);
		successHttp(res, 200, cursoTutor);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ query }: Request, res: Response) => {
	try {
		const cursoTutor = await getAllCursoTutor(query);
		successHttp(res, 200, cursoTutor);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		const cursoTutor = await getOneCurso(Number(params.id));
		successHttp(res, 200, cursoTutor);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		// const daysJSON: string = `("${body.dias.replace(',', '","')}")`;
		let daysJSON = JSON.parse(body.dias);
		console.log({ daysJSON });

		const result2 = await sqlUpdate({
			table: 'ut_curso_tutor',
			datos: {
				salon: body.salon,
				dias: JSON.stringify(daysJSON),
				fecha: body.fecha,
			},
			query: { id_curso_tutor: query.id_curso_tutor },
		});

		// const result = await sqlEjecutar({
		// 	sql: `UPDATE ut_curso_tutor
		// 	SET salon = ?, dias = JSON_ARRAY(?), fecha = ?
		// 	WHERE id_curso_tutor = ?`,
		// 	values: [body.salon, daysJSON, body.fecha, query.id_curso_tutor],
		// });
		res.status(200).json(result2);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const updateSalon = async (
	{ user, body, query }: Request,
	res: Response
) => {
	try {
		const result = await sqlUpdate({
			table: 'ut_curso_tutor',
			datos: { salon: body.salon },
			query: { id_curso_tutor: query.id_curso_tutor },
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ body, query }: Request, res: Response) => {
	try {
		const result = await sqlDelete({
			table: 'ut_curso_tutor',
			query,
		});
		res.status(200).json(result);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

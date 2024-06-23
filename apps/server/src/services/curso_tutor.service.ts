import { Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { UTCursoTutor } from '../entities/CursoTutor';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdateCursoTutor = async (
	cursoTutor: UTCursoTutor
): Promise<UTCursoTutor> => {
	try {
		let cursoTutorRepo = AppDataSource.getRepository(UTCursoTutor);
		let newCursoTutor = cursoTutorRepo.create(cursoTutor);
		return await cursoTutorRepo.save(newCursoTutor);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAllCursoTutor = async ({
	skip = 0,
	take = 10,
	q,
}: IGetAll): Promise<IQueryAll> => {
	try {
		let cursoTutorRepo = AppDataSource.getRepository(UTCursoTutor);
		let [cursoTutor, count] = await cursoTutorRepo.findAndCount({
			relations: ['tutor', 'curso'],
			where: q
				? [
						{ tutor: { nombre: Like(`%${q}%`) } },
						{ curso: { nombre: Like(`%${q}%`) } },
						{ salon: Like(`%${q}%`) },
				  ]
				: [],
			take: take,
			skip: skip,
			order: { fecha: 'DESC', id_curso_tutor: 'ASC' },
		});

		let next = skip + take;

		return {
			data: cursoTutor,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOneCursoTutor = (
	id_curso_tutor: number
): Promise<UTCursoTutor | null> => {
	try {
		let cursoTutorRepo = AppDataSource.getRepository(UTCursoTutor);
		return cursoTutorRepo.findOne({
			relations: ['tutor', 'curso'],
			where: [{ id_curso_tutor }],
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOneCursoTutor = (id_curso_tutor: number) => {
	try {
		let cursoTutorRepo = AppDataSource.getRepository(UTCursoTutor);
		return cursoTutorRepo.softDelete(id_curso_tutor);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

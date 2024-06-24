import { FindOptionsWhere, Like } from 'typeorm';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';
import { UTCurso } from '../entities/Curso';
import AppDataSource from '../config/orm';

export const createOrUpdateCurso = (curso: UTCurso): Promise<UTCurso> => {
	try {
		let cursoRepo = AppDataSource.getRepository(UTCurso);
		return cursoRepo.save(curso);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAllCurso = async ({
	skip = 0,
	take = 10,
	q,
}: IGetAll): Promise<IQueryAll> => {
	try {
		let filters: FindOptionsWhere<UTCurso>[] = [];

		if (q) {
			filters.push({ nombre: Like(`%${q}%`) });
		}

		let cursoRepo = AppDataSource.getRepository(UTCurso);
		let [cursos, count] = await cursoRepo.findAndCount({
			where: filters,
			take: take,
			skip: skip,
		});

		let next = skip + take;

		return {
			data: cursos,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOneCurso = (id_curso: number): Promise<UTCurso | null> => {
	try {
		let cursoRepo = AppDataSource.getRepository(UTCurso);
		return cursoRepo.findOne({
			relations: ['cursoTutores'],
			where: [{ id_curso }],
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOneCurso = (id_curso: number) => {
	try {
		let cursoRepo = AppDataSource.getRepository(UTCurso);
		return cursoRepo.softDelete(id_curso);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

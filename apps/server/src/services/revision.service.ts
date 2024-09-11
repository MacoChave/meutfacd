import { FindOptionsWhere, UpdateResult } from 'typeorm';
import AppDataSource from '../config/orm';
import { UTRevision } from '../entities/Revision';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdate = (revision: UTRevision): Promise<UTRevision> => {
	try {
		let revisionRepo = AppDataSource.getRepository(UTRevision);
		return revisionRepo.save(revision);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAll = async ({
	skip = 0,
	take = 10,
	q,
}: IGetAll): Promise<IQueryAll> => {
	try {
		let filters: FindOptionsWhere<UTRevision>[] = [];

		let revisionRepo = AppDataSource.getRepository(UTRevision);
		let [revision, count] = await revisionRepo.findAndCount({
			where: filters,
			take: +take,
			skip: +skip,
		});

		let next = +skip + +take;

		return {
			data: revision,
			next: next < count ? +next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAllByUser = async (
	id_usuario: number
): Promise<UTRevision[]> => {
	try {
		let revisionRepo = AppDataSource.getRepository(UTRevision);
		return revisionRepo.find({
			relations: ['cursoTutor', 'tutor', 'tesis'],
			where: { tesis: { id_estudiante: id_usuario } },
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOne = (
	id_revision: number | undefined,
	id_usuario: number | undefined,
	estacion: number | undefined
): Promise<UTRevision | null> => {
	try {
		let params: FindOptionsWhere<UTRevision> = {};
		if (id_revision) params = { ...params, id_revision };
		if (id_usuario)
			params = { ...params, tesis: { estudiante: { id_usuario } } };
		if (estacion) params = { ...params, estacion };

		let revisionRepo = AppDataSource.getRepository(UTRevision);
		return revisionRepo.findOne({
			relations: ['cursoTutor', 'tutor', 'tesis'],
			where: [params],
			order: { id_revision: 'DESC' },
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOne = (id_revision: number): Promise<UpdateResult> => {
	try {
		let revisionRepo = AppDataSource.getRepository(UTRevision);
		return revisionRepo.softDelete(id_revision);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

/**
 * Reset user assignment, set id_course_tuto to null and estado to 'E'
 */
export const resetUserAssignment = async (
	id_curso_tutor: number
): Promise<UpdateResult> => {
	try {
		let revisionRepo = AppDataSource.getRepository(UTRevision);
		return revisionRepo.update(
			{
				cursoTutor: { id_curso_tutor },
			},
			{
				id_curso_tutor: null,
				estado: 'E',
			}
		);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

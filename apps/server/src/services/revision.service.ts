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

export const getOne = (id_revision: number): Promise<UTRevision | null> => {
	try {
		let revisionRepo = AppDataSource.getRepository(UTRevision);
		return revisionRepo.findOne({
			relations: ['cursoTutor', 'tutor'],
			where: [{ id_revision }],
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

import { FindOptionsWhere, Like, UpdateResult } from 'typeorm';
import AppDataSource from '../config/orm';
import { UTTesis } from '../entities/Tesis';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdate = (tesis: UTTesis): Promise<UTTesis> => {
	try {
		let tesisRepo = AppDataSource.getRepository(UTTesis);
		return tesisRepo.save(tesis);
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
		let filters: FindOptionsWhere<UTTesis>[] = [];
		// if (q) {
		// 	filters.push({ titulo: Like(`%${q}%`) });
		// }

		let tesisRepo = AppDataSource.getRepository(UTTesis);
		let [tesis, count] = await tesisRepo.findAndCount({
			where: filters,
			take: +take,
			skip: +skip,
		});

		let next = +skip + +take;

		return {
			data: tesis,
			next: next < count ? +next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOne = (id_tesis: number): Promise<UTTesis | null> => {
	try {
		let tesisRepo = AppDataSource.getRepository(UTTesis);
		return tesisRepo.findOne({
			relations: ['revisions', 'revisions.cursoTutor'],
			where: [{ id_tesis }],
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOne = (id_tesis: number): Promise<UpdateResult> => {
	try {
		let tesisRepo = AppDataSource.getRepository(UTTesis);
		return tesisRepo.softDelete(id_tesis);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

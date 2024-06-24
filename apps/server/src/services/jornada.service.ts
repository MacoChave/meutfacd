import { Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { UTJornada } from '../entities/Jornada';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdateOne = async (
	jornada: UTJornada
): Promise<UTJornada> => {
	try {
		let jornadaRepo = AppDataSource.getRepository(UTJornada);
		let newJornada = jornadaRepo.create(jornada);
		return await jornadaRepo.save(newJornada);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const createAll = async (
	jornadas: UTJornada[]
): Promise<UTJornada[]> => {
	try {
		let jornadaRepo = AppDataSource.getRepository(UTJornada);
		let newJornadas = jornadaRepo.create(jornadas);
		return await jornadaRepo.save(newJornadas);
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
		let jornadaRepo = AppDataSource.getRepository(UTJornada);
		let [jornadas, count] = await jornadaRepo.findAndCount({
			relations: ['horarios'],
			where: q ? [{ nombre: Like(`%${q}%`) }] : [],
			take: take,
			skip: skip,
		});

		let next = skip + take;

		return {
			data: jornadas,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOne = async (id_jornada: number): Promise<UTJornada | null> => {
	try {
		let jornadaRepo = AppDataSource.getRepository(UTJornada);
		let jornada: UTJornada | null = await jornadaRepo.findOne({
			where: { id_jornada },
			relations: ['horarios'],
		});
		return jornada;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOne = async (id_jornada: number): Promise<boolean> => {
	try {
		let jornadaRepo = AppDataSource.getRepository(UTJornada);
		let jornada: UTJornada | null = await jornadaRepo.findOneOrFail({
			where: { id_jornada },
		});

		await jornadaRepo.softRemove(jornada);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

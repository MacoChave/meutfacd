import { Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { Rol } from '../entities/Rol';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const allRoles = async ({
	skip = 0,
	take = 10,
	q,
}: IGetAll): Promise<IQueryAll> => {
	try {
		let rolRepo = AppDataSource.getRepository(Rol);
		let [roles, count] = await rolRepo.findAndCount({
			where: q ? [{ nombre: Like(`%${q}%`) }] : [],
			take: take,
			skip: skip,
		});

		let next = skip + take;

		return {
			data: roles,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

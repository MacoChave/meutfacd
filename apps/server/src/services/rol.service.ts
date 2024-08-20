import { Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { Rol } from '../entities/Rol';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdateOne = (rol: Rol): Promise<Rol> => {
	return AppDataSource.getRepository(Rol).save(rol);
};

export const createAll = async (roles: Rol[]): Promise<Rol[]> => {
	try {
		let rolRepo = AppDataSource.getRepository(Rol);
		let newRoles = rolRepo.create(roles);
		return await rolRepo.save(newRoles);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

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
			next: next < count ? +next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOne = async (id_rol: number): Promise<Rol | null> => {
	return AppDataSource.getRepository(Rol).findOneBy({ id_rol });
};

export const deleteOne = async (id_rol: number): Promise<boolean> => {
	try {
		let rolRepo = AppDataSource.getRepository(Rol);
		let rol: Rol | null = await rolRepo.findOneOrFail({
			where: { id_rol },
		});

		await rolRepo.softRemove(rol);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

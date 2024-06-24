import { Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { Departamento } from '../entities/Departmento';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdateOne = async (
	departamento: Departamento
): Promise<Departamento> => {
	try {
		let departamentoRepo = AppDataSource.getRepository(Departamento);
		let newDepartamento = departamentoRepo.create(departamento);
		return await departamentoRepo.save(newDepartamento);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const createAll = async (
	departamentos: Departamento[]
): Promise<Departamento[]> => {
	try {
		let departamentoRepo = AppDataSource.getRepository(Departamento);
		let newDepartamentos = departamentoRepo.create(departamentos);
		return await departamentoRepo.save(newDepartamentos);
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
		let departamentoRepo = AppDataSource.getRepository(Departamento);
		let [departamentos, count] = await departamentoRepo.findAndCount({
			where: q ? [{ nombre: Like(`%${q}$`) }] : [],
			take: take,
			skip: skip,
			order: { nombre: 'ASC' },
		});

		let next = skip + take;

		return {
			data: departamentos,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOne = async (
	id_departamento: number
): Promise<Departamento | null> => {
	try {
		let departamentoRepo = AppDataSource.getRepository(Departamento);
		let departamento: Departamento | null = await departamentoRepo.findOne({
			where: { id_departamento },
		});

		return departamento;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOne = async (id_departamento: number): Promise<boolean> => {
	try {
		let departamentoRepo = AppDataSource.getRepository(Departamento);
		let departamento: Departamento | null =
			await departamentoRepo.findOneOrFail({
				where: { id_departamento },
			});

		await departamentoRepo.softRemove(departamento);

		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

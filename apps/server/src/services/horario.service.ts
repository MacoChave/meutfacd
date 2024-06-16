import AppDataSource from '../config/orm';
import { UTHorario } from '../entities/Horario';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdateOne = async (
	horario: UTHorario
): Promise<UTHorario> => {
	try {
		let horarioRepo = AppDataSource.getRepository(UTHorario);
		let newHorario = horarioRepo.create(horario);
		return await horarioRepo.save(newHorario);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const createAll = async (
	horarios: UTHorario[]
): Promise<UTHorario[]> => {
	try {
		let horarioRepo = AppDataSource.getRepository(UTHorario);
		let newHorarios = horarioRepo.create(horarios);
		return await horarioRepo.save(newHorarios);
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
		let horarioRepo = AppDataSource.getRepository(UTHorario);
		let [horarios, count] = await horarioRepo.findAndCount({
			relations: ['jornada'],
			take: take,
			skip: skip,
		});

		let next = skip + take;

		return {
			data: horarios,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getOne = async (id_horario: number): Promise<UTHorario | null> => {
	try {
		let horarioRepo = AppDataSource.getRepository(UTHorario);
		let horario: UTHorario | null = await horarioRepo.findOne({
			where: { id_horario },
			relations: ['jornada'],
		});

		return horario;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteOne = async (id_horario: number): Promise<boolean> => {
	try {
		let horarioRepo = AppDataSource.getRepository(UTHorario);
		let horario: UTHorario | null = await horarioRepo.findOneOrFail({
			where: { id_horario },
		});

		await horarioRepo.softRemove(horario);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

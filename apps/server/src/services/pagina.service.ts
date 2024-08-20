import { IsNull } from 'typeorm';
import AppDataSource from '../config/orm';
import { UTPagina } from '../entities/Pagina';

export const createOrUpdatePagina = async (
	pagina: UTPagina
): Promise<UTPagina> => {
	try {
		let paginaRepo = AppDataSource.getRepository(UTPagina);
		let newPagina = paginaRepo.create(pagina);
		return await paginaRepo.save(newPagina);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const createBulkPagina = async (
	paginas: UTPagina[]
): Promise<UTPagina[]> => {
	try {
		let paginaRepo = AppDataSource.getRepository(UTPagina);
		let newPaginas = paginaRepo.create(paginas);
		return await paginaRepo.save(newPaginas);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAllParentsPage = async (): Promise<UTPagina[]> => {
	try {
		let paginaRepo = AppDataSource.getRepository(UTPagina);
		return await paginaRepo.find({
			where: { padre: IsNull() },
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const getAllChildrensPage = async (): Promise<UTPagina[]> => {
	try {
		let paginaRepo = AppDataSource.getRepository(UTPagina);
		return await paginaRepo.find({
			relations: ['padre'],
			where: { padre: !IsNull() },
		});
	} catch (error: any) {
		throw new Error(error.message);
	}
};

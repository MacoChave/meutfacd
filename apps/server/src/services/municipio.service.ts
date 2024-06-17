import { Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { Municipio } from '../entities/Municipio';
import { IGetAll } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';

export const createOrUpdateMunicipio = async (
	municipio: Municipio
): Promise<Municipio> => {
	try {
		let municipioRepo = AppDataSource.getRepository(Municipio);
		let newMunicipio = municipioRepo.create(municipio);
		return await municipioRepo.save(newMunicipio);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const bulkCreateMunicipio = async (
	municipios: Municipio[]
): Promise<Municipio[]> => {
	try {
		let municipioRepo = AppDataSource.getRepository(Municipio);
		let newMunicipios = municipioRepo.create(municipios);
		return await municipioRepo.save(newMunicipios);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const allMunicipio = async ({
	skip = 0,
	take = 10,
	q,
}: IGetAll): Promise<IQueryAll> => {
	try {
		let municipioRepo = AppDataSource.getRepository(Municipio);
		let [municipios, count] = await municipioRepo.findAndCount({
			where: q ? [{ municipio: Like(`%${q}%`) }] : [],
			take: take,
			skip: skip,
		});

		let next = skip + take;

		return {
			data: municipios,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const oneMunicipio = async (
	id_municipio: number
): Promise<Municipio | null> => {
	try {
		let municipioRepo = AppDataSource.getRepository(Municipio);
		let municipio: Municipio | null = await municipioRepo.findOne({
			where: { id_municipio },
		});

		return municipio;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteMunicipio = async (
	id_municipio: number
): Promise<boolean> => {
	try {
		let municipioRepo = AppDataSource.getRepository(Municipio);
		let municipio: Municipio | null = await municipioRepo.findOneOrFail({
			where: { id_municipio },
		});

		await municipioRepo.softRemove(municipio);
		return true;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

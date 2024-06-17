import { FindOptionsWhere, Like } from 'typeorm';
import AppDataSource from '../config/orm';
import { Usuario } from '../entities/Usuario';
import { IGetAll, ISPCreateUser } from '../interfaces/parameters';
import { IQueryAll } from '../interfaces/returns';
import UsuarioModel from '../models/user.model';
import { comparePassword } from '../utils/token';

export const userAuth = async ({ correo, pass }: UsuarioModel) => {
	try {
		let userRepo = AppDataSource.getRepository(Usuario);
		let user: Usuario | null = await userRepo.findOne({
			select: ['id_usuario', 'nombre', 'pass', 'roles'],
			relations: ['roles'],
			where: [{ correo }],
		});
		if (!user) throw new Error('Usuario no encontrado');

		console.table(user);

		let isMatch: boolean = await comparePassword(pass, user.pass);
		if (!isMatch) throw new Error('Contraseña incorrecta');

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const createUser = async (usuario: ISPCreateUser): Promise<string> => {
	try {
		await AppDataSource.query(
			`CALL ut_sp_crear_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @error_code, @error_message);`,
			[
				usuario.nombre,
				usuario.apellidos,
				usuario.genero,
				usuario.correo,
				usuario.pass,
				usuario.direccion,
				usuario.fecha_nac,
				usuario.id_municipio,
				+usuario.carnet,
				usuario.cui,
				usuario.rol,
			]
		);

		const [result] = await AppDataSource.query(
			`SELECT 
			@error_code AS error_code, 
			@error_message AS error_message;`
		);

		console.log({ result });

		const { error_code, error_message } = result;

		if (error_code != 0) throw new Error(error_message);

		return 'Usuario creado correctamente';
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const allUser = async ({
	skip = 0,
	take = 10,
	q,
}: IGetAll): Promise<IQueryAll> => {
	try {
		let filters: FindOptionsWhere<Usuario>[] = [];

		if (q) {
			filters.push({ nombre: Like(`%${q}%`) });
			filters.push({ apellidos: Like(`%${q}%`) });
			filters.push({ genero: Like(`%${q}%`) });
			filters.push({ correo: Like(`%${q}%`) });
			filters.push({ telefono: Like(`%${q}%`) });
			if (!isNaN(+q)) filters.push({ carnet: +q });
			filters.push({ estado: Like(`%${q}%`) });
			filters.push({ cui: Like(`%${q}%`) });
		}

		let userRepo = AppDataSource.getRepository(Usuario);
		let [users, count] = await userRepo.findAndCount({
			where: filters,
			take: take,
			skip: skip,
		});

		let next = skip + take;

		return {
			data: users,
			next: next < count ? next : undefined,
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const oneUsuario = async (
	id_usuario: number
): Promise<Usuario | null> => {
	try {
		let userRepo = AppDataSource.getRepository(Usuario);
		let user: Usuario | null = await userRepo.findOne({
			relations: ['municipio', 'perfil', 'roles'],
			where: [{ id_usuario }],
		});

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteUsuario = async (id_usuario: number) => {
	try {
		let userRepo = AppDataSource.getRepository(Usuario);
		let user = await userRepo.findOneOrFail({
			where: { id_usuario },
		});
		return await userRepo.softRemove(user);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

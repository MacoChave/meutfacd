import AppDataSource from '../config/orm';
import { Usuario } from '../entities/Usuario';
import UserModel from '../models/user';
import { comparePassword } from '../utils/token';

export const userAuth = async ({ correo, pass }: UserModel) => {
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

export const allUser = async () => {
	try {
		let userRepo = AppDataSource.getRepository(Usuario);
		let users: Usuario[] = await userRepo.find();
		if (!users) throw new Error('No hay usuarios registrados');

		return users;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const userData = async (id: number) => {
	try {
		let userRepo = AppDataSource.getRepository(Usuario);
		let user: Usuario | null = await userRepo.findOne({
			relations: ['municipio', 'perfil', 'roles'],
			where: [{ id_usuario: id }],
		});
		if (!user) throw new Error('Usuario no encontrado');

		return user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

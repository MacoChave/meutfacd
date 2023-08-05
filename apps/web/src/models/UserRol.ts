export type UserRol = {
	id_usuario: number;
	id_rol: number;
	r_nombre: string;
	u_nombre: string;
	correo: string;
};

export const defaultUserRol: UserRol = {
	id_usuario: 0,
	id_rol: 0,
	r_nombre: '',
	u_nombre: '',
	correo: '',
};

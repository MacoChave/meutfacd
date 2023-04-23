export type AuthUsuario = {
	nombre: string;
	correo: string;
	cui: string;
	rol?: string;
};

export type AuthState = {
	token: string;
	usuario: AuthUsuario;
};

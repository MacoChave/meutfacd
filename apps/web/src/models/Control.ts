export type TPermisos = {
	codigo: number;
	nombre: number;
	description: string;
	menu: string;
};

export type TAuthState = {
	token: string;
	name: string;
	roles: string;
	paginas: TPermisos[];
};

export type TControl = {
	loading: boolean;
	auth: TAuthState;
};

export const controlDefault: TControl = {
	loading: false,
	auth: {
		token: '',
		name: '',
		roles: '',
		paginas: [],
	},
};

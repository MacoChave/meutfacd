export interface Permisos {
	codigo: number;
	nombre: number;
	descripcion: string;
	menu: string;
}

export type AuthState = {
	token: string;
	name: string;
	roles: string;
	paginas: Permisos[];
};

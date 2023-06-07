export interface Permisos {
	codigo: number;
	nombre: number;
	descripcion: string;
	menu: string;
}

export type AuthState = {
	token: string;
	name: string;
	rol: string;
	paginas: Permisos[];
};

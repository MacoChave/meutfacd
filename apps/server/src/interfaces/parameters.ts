export interface IGetAll {
	skip?: number;
	take?: number;
	q?: string;
}

export interface ISendEmail {
	to: string | string[];
	subject: string;
	template: string;
	replaceValues: Record<string, string>;
}

export interface ISPCreateUser {
	nombre: string;
	apellidos: string;
	genero: string;
	correo: string;
	pass: string;
	direccion: string;
	fecha_nac: string;
	id_municipio: number;
	carnet: number;
	cui: string;
	rol: number;
}

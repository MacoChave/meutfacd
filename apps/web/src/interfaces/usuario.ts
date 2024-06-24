export type TUsuario = {
	id_usuario: number;
	nombre: string;
	apellidos: string;
	genero: string;
	correo: string;
	direccion: string;
	telefono: string;
	fecha_nac: Date;
	estado: string;
	doc_cui: null;
	cui: string;
	carnet: number;
	fecha_creacion: Date;
	municipio: TMunicipio;
	perfil: TPerfil;
	roles: TRole[];
};

export type TMunicipio = {
	id_municipio: number;
	municipio: string;
};

export type TPerfil = {
	id_usuario: number;
	id_horario: null;
	id_jornada: null;
	ocupacion: null;
};

export type TRole = {
	id_rol: number;
	nombre: string;
	descripcion: string;
};

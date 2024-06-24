import { MunicipioModel } from './municipio.model';

export default interface UsuarioModel {
	id_usuario?: number;
	nombre: string;
	apellidos: string;
	genero: string;
	correo: string;
	pass: string;
	telefono: string;
	direccion: string;
	fecha_nac: string;
	estado: string;
	fecha_creacion: string;
	id_municipio: number;
	doc_cui?: string;
	carnet?: number;
	cui?: string;
	municipios?: MunicipioModel[];
}

import { RowDataPacket } from 'mysql2/promise';

export default interface User extends RowDataPacket {
	id_usuario: number;
	nombre: string;
	apellidos: string;
	genero: string;
	correo: string;
	pass: string;
	direccion: string;
	fecha_nac: string;
	estado: string;
	fecha_creacion: string;
	id_municipio: number;
	doc_cui?: string;
	carnet?: number;
	cui?: string;
}

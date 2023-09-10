import { RowDataPacket } from 'mysql2/promise';

export default interface Thesis extends RowDataPacket {
	id_tesis: number;
	titulo: string;
	ruta_perfil: string;
	ruta_tesis?: string;
	ruta_asesor?: string;
	fecha_creacion: string;
	fecha_modificacion: string;
	id_estudiante: number;
}

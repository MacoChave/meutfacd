import { RowDataPacket } from 'mysql2/promise';

export default interface Revision extends RowDataPacket {
	id_revision: number;
	fecha: string;
	detalle: string;
	ruta_dictamen: string;
	id_tutor: number;
	id_tesis: number;
	estado: string;
	estacion: number;
}

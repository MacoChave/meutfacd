import { RowDataPacket } from 'mysql2/promise';

export default interface Log extends RowDataPacket {
	fecha: string;
	detalle: string;
	id_usuario: number;
	usuario: string;
}

import { RowDataPacket } from 'mysql2';

export default interface Notification extends RowDataPacket {
	id_notificacion: number;
	mensaje: string;
	fecha: string;
	activo: number;
	id_emisor: number;
	id_receptor: number;
}

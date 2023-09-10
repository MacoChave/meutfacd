import { RowDataPacket } from 'mysql2/promise';

export default interface Rol extends RowDataPacket {
	id_rol: number;
	nombre: string;
	descripcion: string;
}

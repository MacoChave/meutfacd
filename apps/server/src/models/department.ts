import { RowDataPacket } from 'mysql2/promise';

export default interface Department extends RowDataPacket {
	id_departamento: number;
	nombre: string;
}

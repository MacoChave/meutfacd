import { RowDataPacket } from 'mysql2/promise';

export default interface Course extends RowDataPacket {
	id_curso: number;
	nombre: string;
}

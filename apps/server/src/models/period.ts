import { RowDataPacket } from 'mysql2/promise';

export default interface Period extends RowDataPacket {
	id_jornada: number;
	nombre: string;
}

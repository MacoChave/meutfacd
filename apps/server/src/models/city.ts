import { RowDataPacket } from 'mysql2/promise';

export default interface City extends RowDataPacket {
	id_municipio: number;
	id_departamento: number;
	municipio: string;
}

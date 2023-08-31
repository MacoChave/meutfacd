import { RowDataPacket } from 'mysql2/promise';

export default interface Schedule extends RowDataPacket {
	id_horario: number;
	id_jornada: number;
	hora_inicio: string;
	hora_fin: string;
}

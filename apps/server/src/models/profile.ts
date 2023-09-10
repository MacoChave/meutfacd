import { RowDataPacket } from 'mysql2/promise';

export default interface Profile extends RowDataPacket {
	id_usuario: number;
	id_horario?: number;
	id_jornada?: number;
}

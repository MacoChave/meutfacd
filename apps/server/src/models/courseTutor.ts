import { RowDataPacket } from 'mysql2/promise';

export default interface CourseTutor extends RowDataPacket {
	id_curso_tutor: number;
	fecha: string;
	salon: string;
	id_curso: number;
	id_tutor: number;
	id_horario: number;
	id_jornada: number;
}

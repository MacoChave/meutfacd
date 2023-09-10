import { RowDataPacket } from 'mysql2/promise';

export default interface Assignation extends RowDataPacket {
	id_estudiante: number;
	id_curso_tutor: number;
	estado: string;
	ruta_certificado: string;
}

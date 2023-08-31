import { RowDataPacket } from 'mysql2/promise';

export default interface UserRol extends RowDataPacket {
	id_usuario: number;
	id_rol: number;
}

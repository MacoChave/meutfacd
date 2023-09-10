import { RowDataPacket } from 'mysql2/promise';

export default interface Permission extends RowDataPacket {
	id_rol: number;
	id_pagina: number;
	permiso: number;
}

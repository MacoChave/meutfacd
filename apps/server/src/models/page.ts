import { RowDataPacket } from 'mysql2/promise';

export default interface Page extends RowDataPacket {
	id_pagina: number;
	nombre: string;
	descripcion: string;
	indice: number;
	ruta: string;
}

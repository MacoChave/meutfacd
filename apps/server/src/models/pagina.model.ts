export interface PaginaModel {
	id_pagina?: number;
	nombre: string;
	descripcion: string;
	ruta: string;
	id_padre: number;
	indice: number;
	hijos?: PaginaModel[];
}

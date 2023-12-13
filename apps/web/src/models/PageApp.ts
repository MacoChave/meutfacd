import * as Yup from 'yup';

export type TPageApp = {
	id_pagina: number;
	n_padre: string;
	n_hijo: string;
	i_padre: string;
	i_hijo: string;
	descripcion: string;
	ruta: string;
};

export type TSidebarMenu = {
	nombre: string;
	descripcion: string;
	indice: number;
	ruta: string;
};

export const schemaPageApp = Yup.object().shape({
	n_hijo: Yup.string()
		.optional()
		.max(50, 'El nombre no puede ser mayor a 50 caracteres'),
	descripcion: Yup.string()
		.optional()
		.max(125, 'La descripción no puede ser mayor a 125 caracteres'),
	i_hijo: Yup.number().optional().positive('El indice debe ser mayor a 0'),
});

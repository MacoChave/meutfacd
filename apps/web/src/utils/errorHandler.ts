import { AxiosError } from 'axios';

export const errorHandler = (error: AxiosError) => {
	const data: any = error.response?.data;
	console.log({
		codigo: error.response?.status,
		mensaje: error.response?.statusText,
		detalles: data.error || data.msg || 'No se encontró el error',
	});
};

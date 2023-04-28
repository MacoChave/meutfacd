import { AxiosError } from 'axios';

export const errorHandler = (error: AxiosError) => {
	console.log({
		codigo: error.response?.status,
		mensaje: error.response?.statusText,
		detalles: error.response?.data,
	});
};

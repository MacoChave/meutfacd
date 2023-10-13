import * as yup from 'yup';

export type TCitas = {
	fecha: string;
	detalle: string;
	sala: string;
};

export const CitasSchema = yup.object().shape({
	fecha: yup.string().required('La fecha es requerida'),
	detalle: yup.string().optional(),
	sala: yup.string().required('La sala es requerida'),
});

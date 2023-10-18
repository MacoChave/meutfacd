import * as yup from 'yup';

export type TPeriod = {
	id_jornada?: number;
	nombre: string;
};

export const PeriodDefault: TPeriod = {
	id_jornada: 0,
	nombre: '',
};

export const PeriodSchema = yup.object().shape({
	nombre: yup
		.string()
		.max(128, 'Nombre no debe exceder los 128 carácteres')
		.required('Nombre es requerido'),
});

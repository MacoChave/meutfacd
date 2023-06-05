import * as yup from 'yup';

export type Tipo_Recuperar = {
	correo: string;
};

export const initialValuesRecuperar: Tipo_Recuperar = {
	correo: '',
};

export const schemaRecuperar = yup.object().shape({
	correo: yup
		.string()
		.email()
		.required('Correo es requerido')
		.max(100, 'Correo no puede ser mayor a 100 caracteres'),
});

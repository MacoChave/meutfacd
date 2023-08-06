import * as yup from 'yup';

export type RecoveryType = {
	correo: string;
};

export const initialValues: RecoveryType = {
	correo: '',
};

export const schemaRecovery = yup.object().shape({
	correo: yup
		.string()
		.email()
		.required('Correo es requerido')
		.max(100, 'Correo no puede ser mayor a 100 caracteres'),
});

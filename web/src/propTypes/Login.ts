import * as yup from 'yup';

export type LoginType = {
	correo: string;
	pass: string;
};

export const schemaLoginType = yup.object().shape({
	correo: yup
		.string()
		.email()
		.required('Correo es requerido')
		.max(100, 'Correo no puede ser mayor a 100 caracteres'),
	pass: yup
		.string()
		.required('Contraseña es requerida')
		.max(15, 'Contraseña no puede ser mayor a 100 caracteres'),
});

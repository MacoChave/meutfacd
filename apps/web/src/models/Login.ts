import * as yup from 'yup';

export type TLogin = {
	correo: string;
	pass: string;
};

export const loginDefualt: TLogin = {
	correo: '',
	pass: '',
};

export const schemaLogin = yup.object().shape({
	correo: yup
		.string()
		.email()
		.required('Correo es requerido')
		.max(50, 'Correo no puede ser mayor a 100 caracteres'),
	pass: yup
		.string()
		.required('Contraseña es requerida')
		.max(25, 'Contraseña no puede ser mayor a 15 caracteres'),
});

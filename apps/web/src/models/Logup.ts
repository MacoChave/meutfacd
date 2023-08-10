import * as yup from 'yup';

export const initialValuesLogup: Tipo_Logup = {
	id_usuario: 0,
	nombre: '',
	apellido: '',
	genero: '',
	correo: '',
	pass: '',
	carnet: 0,
	cui: '',
	direccion: '',
	fecha_nac: new Date(),
	estado: '',
	telefono: '',
	confpass: '',
};

export type Tipo_Logup = {
	id_usuario: number;
	nombre: string;
	apellido: string;
	genero: string;
	correo: string;
	pass: string;
	carnet: number;
	cui: string;
	direccion: string;
	fecha_nac: Date;
	estado: string;
	telefono: string;
	confpass: string;
};

export const schemaLogup = yup.object().shape({
	nombre: yup
		.string()
		.required('Nombre es requerido')
		.max(50, 'Nombre no puede ser mayor a 50 caracteres'),
	apellido: yup
		.string()
		.required('Apellido es requerido')
		.max(75, 'Apellido no puede ser mayor a 75 caracteres'),
	genero: yup.string().required('Género es requerido'),
	correo: yup
		.string()
		.required('Correo es requerido')
		.email('Debe ser un correo válido')
		.max(100, 'Correo no puede ser mayor a 100 caracteres'),
	pass: yup
		.string()
		.required('Contraseña es requerida')
		.max(100, 'Contraseña no puede ser mayor a 100 caracteres'),
	confpass: yup
		.string()
		.required('Confirmar contraseña es requerido')
		.max(100, 'Confirmar contraseña no puede ser mayor a 100 caracteres')
		.when('pass', {
			is: (val: string) => (val && val.length > 0 ? true : false),
			then: yup
				.string()
				.oneOf([yup.ref('pass')], 'Las contraseñas no coinciden'),
		}),
	carnet: yup
		.number()
		.required('Carnet es requerido')
		.positive('Carnet no puede ser negativo')
		.integer('Carnet debe ser un número entero'),
	cui: yup
		.string()
		.required('DPI es requerido')
		.max(20, 'DPI no puede ser mayor a 20 caracteres'),
	direccion: yup
		.string()
		.required('Dirección es requerido')
		.max(200, 'Dirección no puede ser mayor a 200 caracteres'),
	fecha_nac: yup.string().required('Fecha de nacimiento es requerido'),
	estado: yup.string().notRequired(),
});

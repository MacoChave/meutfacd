import * as yup from 'yup';

export type TLogup = {
	id_usuario: number;
	nombre: string;
	apellido: string;
	genero: string;
	correo: string;
	pass: string;
	carnet: string;
	cui: string;
	direccion: string;
	fecha_nac: Date;
	estado: string;
	telefono: string;
	confpass: string;
};

export const logupDefault: TLogup = {
	id_usuario: 0,
	nombre: '',
	apellido: '',
	genero: '',
	correo: '',
	pass: '',
	carnet: '',
	cui: '',
	direccion: '',
	fecha_nac: new Date(),
	estado: '',
	telefono: '',
	confpass: '',
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
		.max(16, 'Contraseña no puede ser mayor a 100 caracteres'),
	confpass: yup
		.string()
		.required('Confirmar contraseña es requerido')
		.max(16, 'Confirmar contraseña no puede ser mayor a 100 caracteres')
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
		.number()
		.required('DPI es requerido')
		.max(20, 'DPI no puede ser mayor a 20 caracteres')
		.integer('DPI debe ser un número entero'),
	direccion: yup
		.string()
		.required('Dirección es requerido')
		.max(200, 'Dirección no puede ser mayor a 200 caracteres'),
	fecha_nac: yup.string().required('Fecha de nacimiento es requerido'),
	estado: yup.string().notRequired(),
});

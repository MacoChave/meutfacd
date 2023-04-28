import * as yup from 'yup';

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
	estado: yup.string().required('Estado es requerido'),
	telefono: yup
		.string()
		.required('Telefono es requerido')
		.max(200, 'Telefono no puede ser mayor a 200 caracteres'),
});

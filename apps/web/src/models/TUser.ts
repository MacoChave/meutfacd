import * as yup from 'yup';

export interface TUser {
	id_usuario: number;
	nombre: string;
	apellidos: string;
	genero: string;
	correo: string;
	pass: string;
	direccion: string;
	telefono: string;
	fecha_nac: string;
	estado: string;
	fecha_creacion: string;
	id_municipio: number;
	doc_cui: string;
	carnet: number;
	cui: number;
	id_rol: number;
}

export const schemaUsuario = yup.object().shape({
	nombre: yup
		.string()
		.required('El nombre es requerido')
		.max(50, 'El nombre no puede tener más de 50 caracteres'),
	apellidos: yup
		.string()
		.required('Los apellidos son requeridos')
		.max(75, 'Los apellidos no pueden tener más de 75 caracteres'),
	genero: yup
		.string()
		.required('El genero es requerido')
		.max(1, 'El genero no puede tener más de 1 caracter'),
	correo: yup
		.string()
		.email('El correo no es valido')
		.required('El correo es requerido')
		.max(100, 'El correo no puede tener más de 100 caracteres'),
	direccion: yup
		.string()
		.required('La dirección es requerida')
		.max(200, 'La dirección no puede tener más de 200 caracteres'),
	telefono: yup
		.string()
		.max(8, 'El telefono no puede tener más de 8 caracteres'),
	id_rol: yup
		.number()
		// .required('El rol es requerido')
		.positive('El rol es requerido'),
	fecha_nac: yup.string().required('La fecha de nacimiento es requerida'),
	carnet: yup.number().required('El carnet es requerido'),
	cui: yup.number().required('El CUI es requerido'),
});

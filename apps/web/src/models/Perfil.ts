import { formatDate } from '@/utils/formatHandler';
import * as yup from 'yup';

export type Tipo_PerfilTutor = {
	id_tutor: number;
	no_colegiado: string;
	id_rol: number;
};

export type Tipo_PerfilEstudiante = {
	id_estudiante: number;
	id_horario: number;
	id_jornada: number;
};

export type UserType = {
	id_usuario: number;
	nombre: string;
	apellidos: string;
	genero: string;
	correo: string;
	pass: string;
	passConfirm: string;
	carnet: number;
	cui: string;
	direccion: string;
	fecha_nac: string;
	estado: string;
	telefono: string;
	id_rol: number;
	rol: string;
	roles: string;
	id_horario: number;
	id_jornada: number;
};

export const defaultProfile: UserType = {
	id_usuario: 0,
	nombre: '',
	apellidos: '',
	genero: '',
	correo: '',
	pass: '',
	passConfirm: '',
	carnet: 0,
	cui: '',
	direccion: '',
	fecha_nac: formatDate({ date: new Date() }),
	estado: '',
	telefono: '',
	id_rol: 0,
	rol: '',
	roles: '',
	id_horario: 0,
	id_jornada: 0,
};

export const schemaUsuario = yup.object().shape({
	nombre: yup
		.string()
		.required('Nombre es requerido')
		.max(50, 'Nombre no puede ser mayor a 50 caracteres'),
	apellidos: yup
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
		.optional()
		.max(100, 'Contraseña no puede ser mayor a 100 caracteres'),
	passConfirm: yup
		.string()
		.optional()
		.oneOf([yup.ref('pass'), null], 'Contraseñas no coinciden')
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
	fecha_nac: yup
		.string()
		.test(
			'is-future',
			'Fecha de nacimiento no puede ser en el futuro',
			(value) => {
				if (!value) return false;
				const [day, month, year] = value.split('/');
				const date = new Date(`${year}-${month}-${day}`);
				return date <= new Date();
			}
		)
		.required('Fecha de nacimiento es requerido'),
	// estado: yup.string().required('Estado es requerido'),
	// telefono: yup
	// 	.string()
	// 	.required('Telefono es requerido')
	// 	.max(200, 'Telefono no puede ser mayor a 200 caracteres'),
});

export const schemaPerfilTutor = yup.object().shape({
	no_colegiado: yup
		.string()
		.max(20, 'No. Colegiado no puede ser mayor a 20 caracteres')
		.optional(),
	id_rol: yup
		.number()
		.positive('Rol no puede ser negativo')
		.required('Rol es requerido'),
});

export const schemaPerfilEstudiante = yup.object().shape({
	id_horario: yup
		.number()
		.positive('Horario no puede ser negativo')
		.optional(),
	id_jonada: yup
		.number()
		.positive('Jornada no puede ser negativo')
		.optional(),
});

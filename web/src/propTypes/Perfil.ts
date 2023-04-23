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

export type Tipo_Usuario = {
	id_usuario: number;
	nombre: string;
	apellido: string;
	genero: string;
	correo: string;
	pass: string;
	passConfirm: string;
	carnet: number;
	cui: string;
	direccion: string;
	fecha_nac: Date;
	estado: string;
	telefono: string;
	perfil_tutor?: Tipo_PerfilTutor;
	perfil_estudiante?: Tipo_PerfilEstudiante;
};

export const schemaUsuario = yup.object().shape({
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
		.date()
		.max(
			new Date(),
			'La fecha de nacimiento debe ser menor a la fecha actual'
		)
		.required('Fecha de nacimiento es requerido'),
	estado: yup.string().required('Estado es requerido'),
	telefono: yup
		.string()
		.required('Telefono es requerido')
		.max(200, 'Telefono no puede ser mayor a 200 caracteres'),
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

import * as yup from 'yup';

export type TCourseTutor = {
	id_curso_tutor: number;
	fecha: string;
	salon: string;
	dias: string[];
	id_curso: number;
	id_tutor: number;
	id_horario: number;
	id_jornada: number;
};

export const courseTutorDefault: TCourseTutor = {
	id_curso_tutor: 0,
	fecha: new Date().toISOString().slice(0, 10),
	salon: '',
	dias: [],
	id_curso: 0,
	id_tutor: 0,
	id_horario: 0,
	id_jornada: 0,
};

export const courseTutorSchema = yup.object().shape({
	salon: yup
		.string()
		.max(128, 'Salón no debe exceder los 128 carácteres')
		.required('Salón es requerido'),
	fetch: yup.string(),
	dias: yup
		.array()
		.min(1, 'Debe seleccionar al menos un día')
		.required('Días es requerido'),
	id_curso: yup
		.number()
		.positive('Curso es requerido')
		.required('Curso es requerido'),
	id_tutor: yup
		.number()
		.positive('Docente de curso es requerido')
		.required('Docente de curso es requerido'),
	id_horario: yup
		.number()
		.positive('Horario es requerido')
		.required('Horario es requerido'),
	id_jornada: yup
		.number()
		.positive('Jornada es requerido')
		.required('Jornada es requerido'),
});

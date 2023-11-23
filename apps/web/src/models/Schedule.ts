import * as yup from 'yup';

export type TSchedule = {
	id_horario?: number;
	id_jornada: number;
	hora_inicio: string;
	hora_final: string;
};

export const scheduleDefault: TSchedule = {
	id_horario: 0,
	id_jornada: 0,
	hora_inicio: '12:00',
	hora_final: '13:00',
};

export const scheduleSchema = yup.object().shape({
	id_jornada: yup.number().required('Jornada es requerido'),
	hora_inicio: yup.string().required('Hora de inicio es requerido'),
	hora_final: yup.string().required('Hora de fin es requerido'),
});

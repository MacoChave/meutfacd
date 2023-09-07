import { URL } from '@/api/server';
import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';
import { McInput } from '@/components/McWithForms/McInput';
import { useCustomFetch } from '@/hooks/useFetch';
import { Course } from '@/models/Course';
import {
	TCourseTutor,
	courseTutorDefault,
	courseTutorSchema,
} from '@/models/CourseTutor';
import { UserType } from '@/models/Perfil';
import { PeriodType } from '@/models/Period';
import { ResultType } from '@/models/Result';
import { ScheduleType } from '@/models/Schedule';
import { PickEvaluador } from '@/pages/encargado/components/PickEvaluador';
import { PickHorario } from '@/pages/encargado/components/PickHorario';
import { PickJornada } from '@/pages/encargado/components/PickJornada';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { PickDays } from '../PickDays';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';

export type FormProps = {
	onClose: () => void;
};

const Form: React.FC<FormProps> = ({ onClose }) => {
	const [jornada, setJornada] = useState({} as PeriodType);
	const [horario, setHorario] = useState({} as ScheduleType);
	const [professor, setProfessor] = useState({} as UserType);
	const [days, setDays] = React.useState<string[]>([]);

	const { control, reset, setValue, getValues, handleSubmit } = useForm({
		defaultValues: courseTutorDefault,
		mode: 'onBlur',
		resolver: yupResolver(courseTutorSchema),
	});

	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		body: {
			table: 'ut_curso',
		},
		method: 'post',
		params: {},
	});

	const onSubmit: SubmitHandler<TCourseTutor> = async (data) => {
		console.log('Send data', data);
		const result: ResultType = await postData({
			path: URL.COURSE_TUTOR,
			body: {
				salon: data['salon'],
				dias: JSON.stringify(data['dias']),
				fecha: data['fecha'],
				id_curso: data['id_curso'],
				id_tutor: data['id_tutor'],
				id_horario: data['id_horario'],
				id_jornada: data['id_jornada'],
			},
		});
		console.log('Result', result);
		if (result.affectedRows > 0) {
			reset();
			setHorario({} as ScheduleType);
			setJornada({} as PeriodType);
			setProfessor({} as UserType);
			setDays([]);
			swal('¡Listo!', 'El curso se ha asignado correctamente', 'success');
			onClose();
		}
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(200px, 1fr))',
						gap: 2,
					}}>
					<McAutocomplete
						control={control as any}
						name='id_curso'
						label='Curso'
						options={data.map((item: Course) => ({
							id: item.id_curso,
							label: item.nombre,
						}))}
					/>
					<McInput
						control={control as any}
						name='salon'
						label='Salón'
					/>
					<McInput
						control={control as any}
						name='fecha'
						label='Fecha de inicio'
						type='date'
						customChange={(e) => {
							setValue('fecha', e.target.value);
						}}
					/>
					<PickDays
						days={days}
						setDays={(days: string[]) => {
							setValue('dias', days);
							setDays(days);
						}}
					/>
					<PickJornada
						jornada={jornada}
						setJornada={(jornada: PeriodType) => {
							setValue('id_jornada', jornada.id_jornada);
							setJornada(jornada);
						}}
					/>
					<PickHorario
						horario={horario}
						setHorario={(horario: ScheduleType) => {
							setValue('id_horario', horario.id_horario);
							setHorario(horario);
						}}
						id_jornada={jornada.id_jornada ?? 0}
					/>
					<PickEvaluador
						evaluador={professor}
						setEvaluador={(professor: UserType) => {
							setValue('id_tutor', professor.id_usuario);
							setProfessor(professor);
						}}
						rol={`%Docente curso ${getValues('id_curso')}%`}
					/>
					<Button type='submit' variant='contained'>
						Guardar
					</Button>
				</Box>
			</form>
		</>
	);
};

export default Form;

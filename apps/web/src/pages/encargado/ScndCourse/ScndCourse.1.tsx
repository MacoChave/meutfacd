import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { UserType } from '@/models/Perfil';
import { PeriodType } from '@/models/Period';
import { ReviewType } from '@/models/Review';
import { ScheduleType } from '@/models/Schedule';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { ScndCourseProps } from './ScndCourse';

export const ScndCourse: React.FC<ScndCourseProps> = ({}) => {
	const [jornada, setJornada] = useState<PeriodType>({} as PeriodType);
	const [horario, setHorario] = useState<ScheduleType>({} as ScheduleType);
	const [docente, setDocente] = useState<UserType>({} as UserType);
	const [assignment, setAssignment] = useState<ReviewType[]>(
		[] as ReviewType[]
	);
	const [unAssignment, setUnAssignment] = useState<ReviewType[]>(
		[] as ReviewType[]
	);

	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: {
			estado: 'A',
			estacion: 2,
			id_jornada: jornada.id_jornada || 0,
			id_horario: horario.id_horario || 0,
		},
	});

	const saveAssign = () => {
		if (!docente.id_usuario) {
			swal(
				'Error',
				'No se ha seleccionado un docente para asignar',
				'error'
			);
			return;
		}

		const id_tutor = docente.id_usuario;
		const id_revisiones = assignment.map((s) => s.id_revision);
	};

	const assign = (student: any) => {
		setAssignment([...assignment, student]);
		setUnAssignment(unAssignment.filter((s) => s !== student));
	};

	const unassign = (student: any) => {
		setUnAssignment([...unAssignment, student]);
		setAssignment(assignment.filter((s) => s !== student));
	};

	useEffect(() => {
		if (data) {
			setUnAssignment(data);
			console.log(assignment);
		}
	}, [data]);

	if (isLoading) {
		return <div>Cargando...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	return (
		<>
			<Contenedor title='Asignación al curso 1'>
				<Box sx={style}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(150px, 1fr))',
							gap: 2,
						}}>
						<PickJornada
							jornada={jornada}
							setJornada={setJornada}
						/>
						<PickHorario
							horario={horario}
							setHorario={setHorario}
							id_jornada={jornada.id_jornada}
						/>
					</Box>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(150px, 1fr))',
							gap: 2,
							gridColumnEnd: 'span 2',
						}}>
						<PickEvaluador
							evaluador={docente}
							setEvaluador={setDocente}
							rol='Docente curso 1'
						/>
						<Button variant='contained' onClick={saveAssign}>
							Guardar asignación
						</Button>
					</Box>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(150px, 1fr))',
							gap: 2,
							gridColumnEnd: 'span 2',
						}}>
						<Box>
							<Typography variant='h6' component={'h3'}>
								Estudiantes disponibles
							</Typography>
							<List>
								{unAssignment.map((value) => {
									const labelId = `${value.id_revision}`;
									return (
										<ListItem
											key={labelId}
											secondaryAction={
												<IconButton
													edge='end'
													onClick={() =>
														assign(value)
													}>
													<SwitchLeft />
												</IconButton>
											}>
											<ListItemButton
												role={undefined}
												onClick={() => assign}
												dense>
												<ListItemText
													primary={value.nombre}
												/>
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
						</Box>
						<Box>
							<Typography variant='h6' component={'h3'}>
								Estudiantes asignados
							</Typography>
							<List>
								{assignment.map((value) => {
									const labelId = `${value.id_revision}`;
									return (
										<ListItem
											key={labelId}
											secondaryAction={
												<IconButton
													edge='end'
													onClick={() =>
														unassign(value)
													}>
													<SwitchLeft />
												</IconButton>
											}>
											<ListItemButton
												role={undefined}
												onClick={() => unassign}
												dense>
												<ListItemText
													primary={value.nombre}
												/>
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
						</Box>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

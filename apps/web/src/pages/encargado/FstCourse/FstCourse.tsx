import { URL } from '@/consts/Api';
import { Contenedor, Loader } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { ESPERA, REVISION } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TCourseTutor } from '@/models/CourseTutor';
import { TPeriod } from '@/models/Period';
import { TReview } from '@/models/Review';
import { TSchedule } from '@/models/Schedule';
import { putData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { SwitchLeft } from '@mui/icons-material';
import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { PickCourseTutor } from '../components/PickCourseTutor';
import { PickHorario } from '../components/PickHorario';
import { PickJornada } from '../components/PickJornada';
import { SpinLoader } from '@/components/Loader/SpinLoader';

export type FstCourseProps = Record<string, never>;

const FstCourse: React.FC<FstCourseProps> = ({}) => {
	const [jornada, setJornada] = useState<TPeriod>({} as TPeriod);
	const [horario, setHorario] = useState<TSchedule>({} as TSchedule);
	const [courseTutor, setCourseTutor] = useState<TCourseTutor>(
		{} as TCourseTutor
	);
	const [assignment, setAssignment] = useState<TReview[]>([] as TReview[]);
	const [unAssignment, setUnAssignment] = useState<TReview[]>(
		[] as TReview[]
	);
	const [waiting, setWaiting] = useState(false);

	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: {
			estado: ESPERA,
			estacion: 2,
			id_jornada: jornada.id_jornada || 0,
			id_horario: horario.id_horario || 0,
		},
	});

	const saveAssign = async () => {
		setWaiting(true);
		if (!courseTutor.id_curso_tutor) {
			swal(
				'Error',
				'Seleccione un salón de clases para asignar',
				'error'
			);
			return;
		}

		for await (const assign of assignment) {
			try {
				// await postData({
				// 	path: URL.ASSIGNMENT,
				// 	body: {
				// 		id_curso_tutor: courseTutor.id_curso_tutor,
				// 		id_estudiante: assign.id_usuario,
				// 	},
				// });
				await putData({
					path: URL.REVIEW,
					body: {
						id_tutor: courseTutor.id_tutor,
						estado: REVISION,
						id_curso_tutor: courseTutor.id_curso_tutor,
					},
					params: { id_revision: assign.id_revision },
				});
			} catch (error) {
				console.log(error);
			}
		}
		setAssignment([]);
		setCourseTutor({} as TCourseTutor);
		setWaiting(false);
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
		}
	}, [data]);

	if (isLoading) return <DotsLoaders />;

	if (isError)
		return <Typography>Error al cargar los estudiantes</Typography>;

	return (
		<>
			<Contenedor title='Asignación al curso I'>
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
							id_jornada={jornada?.id_jornada ?? 0}
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
						<PickCourseTutor
							courseTutor={courseTutor}
							setCourseTutor={setCourseTutor}
							id_horario={horario?.id_horario ?? 0}
							id_jornada={jornada?.id_jornada ?? 0}
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
								{unAssignment.length} estudiantes disponibles
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
								{assignment.length} estudiantes asignados
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
			{waiting && <SpinLoader />}
		</>
	);
};

export default FstCourse;

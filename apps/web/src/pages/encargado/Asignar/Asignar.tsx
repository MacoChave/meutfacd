import { URL } from '@/consts/Api';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUser } from '@/models/Perfil';
import { TPeriod } from '@/models/Period';
import { TSchedule } from '@/models/Schedule';
import { style } from '@/themes/styles';
import { Add, Remove } from '@mui/icons-material';
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
import { PickJornada } from '../components/PickJornada';
import { PickHorario } from '../components/PickHorario';
import { PickEvaluador } from '../components/PickEvaluador';

export type AsignarProps = {
	rol: string;
};

const Asignar: React.FC<AsignarProps> = ({ rol }) => {
	const [jornada, setJornada] = useState<TPeriod>({} as TPeriod);
	const [horario, setHorario] = useState<TSchedule>({} as TSchedule);
	const [evaluador, setEvaluador] = useState<TUser>({} as TUser);
	const [assignment, setAssignment] = useState<any[]>([]);
	const [unAssignment, setUnAssignment] = useState<any[]>([]);

	const {
		data: students,
		isLoading: isLoadingStudents,
		isError: isErrorStudent,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: {
			estado: 'A',
			estacion: 1,
			id_jornada: jornada.id_jornada,
			id_horario: horario.id_horario,
		},
	});

	const onSave = () => {
		console.log('onSave is not implemented', {
			jornada,
			horario,
			evaluador,
			assignment,
		});
	};

	const assign = (student: any) => {
		setAssignment([...assignment, student]);
		setUnAssignment(unAssignment.filter((s) => s !== student));
	};

	const unAssign = (student: any) => {
		setUnAssignment([...unAssignment, student]);
		setAssignment(assignment.filter((s) => s !== student));
	};

	useEffect(() => {
		if (students && students.lengh > 0) {
			setUnAssignment(students);
		}
	}, [students]);

	return (
		<>
			<Contenedor title='Asignar estudiantes'>
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
						}}>
						<PickEvaluador
							evaluador={evaluador}
							setEvaluador={setEvaluador}
							rol={rol}
						/>
						<Button variant='contained' onClick={onSave}>
							Guardar asignaciones
						</Button>
					</Box>
					<Box>
						<Typography variant='h6' component='h3'>
							Listado de estudiantes
						</Typography>
						<List>
							{unAssignment.map((value, index) => {
								const labelId = `${value.id_revision}`;

								return (
									<ListItem
										key={index}
										secondaryAction={
											<IconButton
												edge='end'
												aria-label='comments'>
												<Add />
											</IconButton>
										}
										disablePadding>
										<ListItemButton
											role={undefined}
											onClick={() => assign(value)}
											dense>
											<ListItemText
												id={labelId}
												primary={value.nombre}
											/>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
					<Box>
						<Typography variant='h6' component='h3'>
							Estudiantes asignados
						</Typography>
						<List>
							{assignment.map((value, index) => {
								const labelId = `checkbox-list-label-${value}`;

								return (
									<ListItem
										key={index}
										secondaryAction={
											<IconButton
												edge='end'
												aria-label='comments'>
												<Remove />
											</IconButton>
										}
										disablePadding>
										<ListItemButton
											role={undefined}
											onClick={() => unAssign(value)}
											dense>
											<ListItemText
												id={labelId}
												primary={value}
											/>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Asignar;

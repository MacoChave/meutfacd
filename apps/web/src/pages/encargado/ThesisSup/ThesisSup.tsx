import { URL } from '@/consts/Api';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUser } from '@/models/Perfil';
import { TResult } from '@/models/Fetching';
import { TReview } from '@/models/Review';
import { putData } from '@/services/fetching';
import { style } from '@/themes/styles';
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
import { PickEvaluador } from '../components/PickEvaluador';
import { SwitchLeft, SwitchRight } from '@mui/icons-material';
import { ESPERA, PENDIENTE } from '@/consts/Vars';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';

export type ThesisSupProps = Record<string, never>;

const ThesisSup: React.FC<ThesisSupProps> = ({}) => {
	const [docente, setDocente] = useState<TUser>({} as TUser);
	const [unAssignmentUsers, setUnassignmentUsers] = useState<TReview[]>(
		[] as TReview[]
	);
	const [assignmentUsers, setAssignmentUsers] = useState<TReview[]>(
		[] as TReview[]
	);

	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: { estado: ESPERA, estacion: 5 },
	});

	const saveAssign = async () => {
		if (!docente.id_usuario) {
			swal(
				'Error',
				'No se ha seleccionado un docente para asignar',
				'error'
			);
			return;
		}
		const id_tutor = docente.id_usuario;
		const id_revisiones = assignmentUsers.map((s) => s.id_revision);

		const results: TResult[] = await putData({
			path: `${URL.REVIEW}/assign`,
			body: { id_revisiones, id_tutor },
		});

		if (results.some((r) => r.affectedRows === 0)) {
			swal(
				'Error',
				'No se ha podido asignar a todos los estudiantes',
				'error'
			);
		} else {
			swal(
				'Asignación exitosa',
				'Se ha asignado correctamente a los estudiantes',
				'success'
			);
			setAssignmentUsers([]);
			setDocente({} as TUser);
		}
	};

	const assign = (student: any) => {
		setAssignmentUsers([...assignmentUsers, student]);
		setUnassignmentUsers(unAssignmentUsers.filter((s) => s !== student));
	};

	const unAssign = (student: any) => {
		setUnassignmentUsers([...unAssignmentUsers, student]);
		setAssignmentUsers(assignmentUsers.filter((s) => s !== student));
	};

	useEffect(() => {
		if (data) {
			setUnassignmentUsers(data);
		}
	}, [data]);

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error...</Typography>;

	return (
		<>
			<Contenedor title='Asignar revisores de comisión y estilo'>
				<Box sx={style}>
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
							rol={'Docente'}
							page='Comisión y estilo'
							status={1}
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
								{unAssignmentUsers.map((value) => {
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
											}
											disablePadding>
											<ListItemButton
												role={undefined}
												onClick={() => assign(value)}
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
								Estudiantes a asignar
							</Typography>
							<List>
								{assignmentUsers.map((value) => {
									const labelId = `${value.id_revision}`;
									return (
										<ListItem
											key={labelId}
											secondaryAction={
												<IconButton
													edge='end'
													onClick={() =>
														unAssign(value)
													}>
													<SwitchRight />
												</IconButton>
											}
											disablePadding>
											<ListItemButton
												role={undefined}
												onClick={() => unAssign(value)}
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

export default ThesisSup;

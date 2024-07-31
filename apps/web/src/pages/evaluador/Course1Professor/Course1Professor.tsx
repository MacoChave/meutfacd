import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import {
	APROBADO,
	ESPERA,
	ESTACIONES,
	RECHAZADO,
	REVISION,
} from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { postData, putData } from '@/services/fetching';
import { formatStationName } from '@/utils/formatHandler';
import {
	Cancel,
	Check,
	Close,
	GridOn,
	Publish,
	Save,
	Summarize,
} from '@mui/icons-material';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { PickSeccionCourse } from '../components/PickSeccionCourse';

export type Course1ProfessorProps = Record<string, never>;

const Course1Professor: React.FC<Course1ProfessorProps> = ({}) => {
	const [loading, setLoading] = useState(false);
	const [section, setSection] = useState({} as any);
	const [newSection, setNewSection] = useState('');
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: REVISION, estacion: 2, salon: section.salon },
	});

	const updateSection = () => {
		try {
			let result: any = putData<TResult>({
				path: `${URL.COURSE_TUTOR}/salon`,
				body: { salon: newSection },
				params: { id_curso_tutor: section.id_curso_tutor },
			});
			swal('Éxito', 'Se actualizó el salón', 'success');
		} catch (error: any) {
			swal('Error', 'No se pudo actualizar el salón', 'error');
		} finally {
			refetch();
			setNewSection('');
			setSection({} as any);
		}
	};

	const onPass = async (item: any) => {
		setLoading(true);
		const dictamen = await postData<any>({
			path: `${URL.PDF}/course1`,
			body: {
				idStudent: item.id_usuario,
				title: item.titulo,
				idReview: item.id_revision,
				currentStation: formatStationName(ESTACIONES[1]),
				nextStation: formatStationName(ESTACIONES[2]),
				filename: 'dictmen_curso_I',
			},
		});

		Promise.all([
			putData<TResult>({
				path: URL.REVIEW,
				body: {
					estado: APROBADO,
					detalle: 'Curso aprobado',
					ruta_dictamen: dictamen.name ?? '',
				},
				params: { id_revision: item.id_revision },
			}),
			postData<TResult>({
				path: URL.NOTIFICATION,
				body: {
					id_receptor: item.id_usuario,
					mensaje: `El curso de Introducción a la planeación científica fue aprobado por el evaluador ${item.tutor}. Proceda a cargar el asesor de tesis`,
					action: 'aprobado',
				},
			}),
			// postData<TResult>({
			// 	path: URL.REVIEW,
			// 	body: { id_tesis: item.id_tesis, estado: ESPERA, estacion: 3 },
			// }),
		])
			.then(([result1]) => {
				if (result1.affectedRows) {
					swal(
						'Éxito',
						'Se registró el avance a la siguiente fase del estudiante',
						'success'
					);
				} else {
					swal('Error', 'No se pudo aprobar el curso', 'error');
				}
				refetch();
			})
			.catch(() => {
				swal('Error', 'No se pudo aprobar el curso', 'error');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onFail = async (item: any) => {
		setLoading(true);
		Promise.all([
			putData<TResult>({
				path: URL.REVIEW,
				body: { estado: RECHAZADO, detalle: 'Curso reprobado' },
				params: { id_revision: item.id_revision },
			}),
			postData<TResult>({
				path: URL.REVIEW,
				body: { id_tesis: item.id_tesis, estado: ESPERA, estacion: 2 },
			}),
		])
			.then(([result1, result2]) => {
				if (result1.affectedRows && result2.affectedRows) {
					swal(
						'Éxito',
						'Se reprobó al estudiante y se envió a repetir el curso',
						'success'
					);
				} else {
					swal('Error', 'No se pudo reprobar el curso', 'error');
				}
				refetch();
			})
			.catch(() => {
				swal('Error', 'No se pudo reprobar el curso', 'error');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			<Contenedor title='Curso I'>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 2,
						width: '100%',
						marginBottom: 2,
					}}>
					<PickSeccionCourse
						course={1}
						section={section}
						label='Sección'
						setSection={setSection}
					/>
					<TextField
						label='Salón'
						value={newSection}
						onChange={(e) => setNewSection(e.target.value)}
						InputProps={{
							endAdornment: (
								<Tooltip title='Actualizar salón del curso'>
									<IconButton
										aria-label='update'
										onClick={() => updateSection()}>
										<Save />
									</IconButton>
								</Tooltip>
							),
						}}
					/>
					<Tooltip title='Generar Excel'>
						<IconButton onClick={() => {}}>
							<GridOn color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Generar PDF'>
						<IconButton onClick={() => {}}>
							<Summarize color='primary' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Congelar curso'>
						<IconButton onClick={() => {}}>
							<Publish color='warning' />
						</IconButton>
					</Tooltip>
				</Box>
				<McTable
					headers={{
						nombre: 'Estudiante',
						fecha_creacion: 'Inicio',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
					}}
					rows={data}
					totalCols={{}}
					actions={[
						{
							tooltip: 'Rechazar estudiante',
							icon: <Close color='warning' />,
							onClick: (row) => onFail(row),
						},
						{
							tooltip: 'Aprobar estudiante',
							icon: <Check color='primary' />,
							onClick: (row) => onPass(row),
						},
					]}
					// onPass={onPass}
					// onFail={onFail}
				/>
			</Contenedor>
			{loading && <DotsLoaders />}
		</>
	);
};

export default Course1Professor;

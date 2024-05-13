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
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { PickSeccionCourse } from '../components/PickSeccionCourse';
import { Update } from '@mui/icons-material';
import { set } from 'react-hook-form';

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
			path: `${URL.PDF}/dictamen`,
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
						width: '100%',
						marginBottom: 2,
					}}>
					<PickSeccionCourse
						course={1}
						section={section}
						setSection={setSection}
					/>
					<TextField
						label='Nuevo salón'
						value={newSection}
						onChange={(e) => setNewSection(e.target.value)}
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label='update'
									onClick={() => updateSection()}>
									<Update />
								</IconButton>
							),
						}}
					/>
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
					onPass={onPass}
					onFail={onFail}
				/>
			</Contenedor>
			{loading && <DotsLoaders />}
		</>
	);
};

export default Course1Professor;

import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import {
	APROBADO,
	ESPERA,
	ESTACIONES,
	RECHAZADO,
	REVISION,
} from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { postData, putData } from '@/services/fetching';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';

export type Course1ProfessorProps = Record<string, never>;

const Course1Professor: React.FC<Course1ProfessorProps> = ({}) => {
	const [loading, setLoading] = useState(false);
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: REVISION, estacion: 2 },
	});

	const onPass = async (item: any) => {
		setLoading(true);
		const dictamen = await postData<any>({
			path: `${URL.PDF}/dictamen`,
			body: {
				idStudent: item.id_usuario,
				title: item.titulo,
				idReview: item.id_revision,
				currentStation: ESTACIONES[1].toLowerCase(),
				nextStation: ESTACIONES[2].toLowerCase(),
				filename: 'Curso 1',
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
			<Contenedor title='Curso 1'>
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

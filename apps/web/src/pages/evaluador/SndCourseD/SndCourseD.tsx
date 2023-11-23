import { URL } from '@/consts/Api';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import {
	APROBADO,
	ESPERA,
	ESTACIONES,
	PENDIENTE,
	RECHAZADO,
	REVISION,
} from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { postData, putData } from '@/services/fetching';
import { formatStationName } from '@/utils/formatHandler';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';

export type SndCourseDProps = Record<string, never>;

const SndCourseD: React.FC<SndCourseDProps> = ({}) => {
	const [loading, setLoading] = useState(false);
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: REVISION, estacion: 3 },
	});

	const onPass = async (item: any) => {
		setLoading(true);
		const dictamen = await postData<any>({
			path: `${URL.PDF}/dictamen`,
			body: {
				idStudent: item.id_usuario,
				title: item.titulo,
				idReview: item.id_revision,
				currentStation: formatStationName(ESTACIONES[2]),
				nextStation: formatStationName(ESTACIONES[4]),
				filename: 'dictamen_curso_II',
			},
		});

		Promise.all([
			putData<TResult>({
				path: `${URL.REVIEW}`,
				body: {
					estado: APROBADO,
					detalle: 'Curso aprobado',
					ruta_dictamen: dictamen.name ?? '',
				},
				params: { id_revision: item.id_revision },
			}),
			postData<TResult>({
				path: `${URL.REVIEW}`,
				body: {
					id_tesis: item.id_tesis,
					estacion: 5,
					estado: PENDIENTE,
				},
				params: {},
			}),
			postData<TResult>({
				path: `${URL.NOTIFICATION}`,
				body: {
					id_receptor: item.id_usuario,
					mensaje: `El curso de Elaboración y planeación de tesis fue aprobado por el evaluador ${item.tutor}`,
					action: 'aprobado',
				},
				params: {},
			}),
		])
			.then(([putReview, postReview, postNotify]) => {
				if (putReview.affectedRows) {
					swal(
						'¡Bien hecho!',
						'Se ha registrado el avance a la siguiente fase del estudiante',
						'success'
					);
				}
				refetch();
			})
			.catch(() => {
				swal('Error', 'No se pudo completar la operación', 'error');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onFail = async (item: any) => {
		setLoading(true);
		Promise.all([
			putData<TResult>({
				path: `${URL.REVIEW}`,
				body: {
					estado: RECHAZADO,
					detalle: 'Curso reprobado',
				},
				params: { id_revision: item.id_revision },
			}),
			postData<TResult>({
				path: `${URL.REVIEW}`,
				body: {
					id_tesis: item.id_tesis,
					estacion: 3,
					estado: ESPERA,
				},
				params: {},
			}),
			postData<TResult>({
				path: `${URL.NOTIFICATION}`,
				body: {
					id_receptor: item.id_usuario,
					mensaje: `El curso de Elaboración y planeación de tesis fue rechazado por el evaluador ${item.tutor}`,
					action: 'rechazado',
				},
				params: {},
			}),
		])
			.then(([putReview, postReview, postNotify]) => {
				if (putReview.affectedRows) {
					swal(
						'¡Bien hecho!',
						'Se ha registrado la reprobación del curso',
						'success'
					);
				}
				refetch();
			})
			.catch(() => {
				swal('Error', 'No se pudo completar la operación', 'error');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Hubo un error</Typography>;

	return (
		<>
			<Contenedor title='Curso II'>
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

export default SndCourseD;

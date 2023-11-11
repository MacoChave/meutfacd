import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { APROBADO, ESTACIONES } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { postData, putData } from '@/services/fetching';
import { formatStationName } from '@/utils/formatHandler';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';

export type StudentTutorProps = {};

const StudentTutor: React.FC<StudentTutorProps> = ({}) => {
	const [loading, setLoading] = useState(false);
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			conditions: [
				{
					column: 'ruta_certificado',
					operator: 'is',
					value: 'null',
				},
				{
					column: 'ruta_certificado',
					operator: '=',
					value: '',
				}
			],
		},
		params: { estado: APROBADO, estacion: 2 },
	});

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
				filename: 'Nombramiento',
			},
		});
		if (item.ruta_certificado === '') {
			await postData<TResult>({
				path: URL.REVIEW,
				body: {
					id_tesis: item.id_tesis,
					estacion: 3,
				},
				params: {},
			});
		}

		Promise.all([
			// postData<TResult>({
			// 	path: URL.REVIEW,
			// 	body: {
			// 		id_tesis: item.id_tesis,
			// 		estacion: 3
			// 	},
			// 	params: {},
			// }),
			putData<TResult>({
				path: URL.REVIEW,
				body: { ruta_certificado: dictamen.name ?? '' },
				params: { id_revision: item.id_revision },
			}),
			postData<TResult>({
				path: URL.NOTIFICATION,
				body: {
					id_receptor: item.id_usuario,
					mensaje: `El nombramiento del asesor fue aprobado`,
					action: 'aprobado',
				},
				params: {},
			}),
		])
			.then(([res1, res2]) => {
				if (res1.affectedRows && res2.affectedRows) {
					swal(
						'¡Buen trabajo!',
						'El nombramiento del asesor fue aprobado',
						'success'
					);
				} else {
					swal(
						'¡Error!',
						'No se pudo aprobar el nombramiento del asesor',
						'error'
					);
				}
				refetch();
			})
			.catch(() => {
				swal(
					'¡Error!',
					'No se pudo aprobar el nombramiento del asesor',
					'error'
				);
			})
			.finally(() => setLoading(false));
	};

	const onFail = async (item: any) => {
		setLoading(true);
		Promise.all([
			postData<TResult>({
				path: URL.NOTIFICATION,
				body: {
					id_receptor: item.id_usuario,
					mensaje: `El nombramiento del asesor fue rechazado, Adjunte un nuevo nombramiento`,
					action: 'rechazado',
				},
				params: {},
			}),
		])
			.then(([res1]) => {
				if (res1.affectedRows) {
					swal(
						'¡Buen trabajo!',
						'El nombramiento del asesor fue rechazado',
						'success'
					);
				} else {
					swal(
						'¡Error!',
						'No se pudo rechazar el nombramiento del asesor',
						'error'
					);
				}
				refetch();
			})
			.catch(() => {
				swal(
					'¡Error!',
					'No se pudo rechazar el nombramiento del asesor',
					'error'
				);
			})
			.finally(() => setLoading(false));
	};

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return (
			<Typography>
				No se pudo cargar los datos de los estudiantes
			</Typography>
		);
	return (
		<>
			<Contenedor title='Asesor de tesis de estudiantes'>
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

export default StudentTutor;

import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { APROBADO, ESPERA, RECHAZADO } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { ResultType } from '@/models/Result';
import { postData, putData } from '@/services/fetching';
import React from 'react';
import swal from 'sweetalert';

export type Course1ProfessorProps = Record<string, never>;

const Course1Professor: React.FC<Course1ProfessorProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: 'V', estacion: 2 },
	});

	const onPass = async (item: any) => {
		Promise.all([
			putData<ResultType>({
				path: URL.REVIEW,
				body: { estado: APROBADO, detalle: 'Curso aprobado' },
				params: { id_revision: item.id_revision },
			}),
			postData<ResultType>({
				path: URL.REVIEW,
				body: { id_tesis: item.id_tesis, estado: 'V', estacion: 3 },
			}),
		])
			.then(([result1, result2]) => {
				if (result1.affectedRows && result2.affectedRows) {
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
			});
	};

	const onFail = async (item: any) => {
		Promise.all([
			putData<ResultType>({
				path: URL.REVIEW,
				body: { estado: RECHAZADO, detalle: 'Curso reprobado' },
				params: { id_revision: item.id_revision },
			}),
			postData<ResultType>({
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
			});
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <div>Error</div>;

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
		</>
	);
};

export default Course1Professor;

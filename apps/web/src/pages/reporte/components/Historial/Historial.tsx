'use client';
import { McTable } from '@/components';
import { URL } from '@/consts/Api';
import { APROBADO } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { TProgress } from '@/models/Progress';
import { getData, postData, putData } from '@/services/fetching';
import { Skeleton, Typography } from '@mui/material';
import { table } from 'console';
import dayjs from 'dayjs';
import React from 'react';
import swal from 'sweetalert';

export type HistorialProps = {
	station?: number;
	date?: string;
};

const Historial: React.FC<HistorialProps> = ({ station, date }) => {
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			conditions: [
				{
					column: 'fecha',
					operator: '>=',
					value: dayjs(date).startOf('month').format('YYYY-MM-DD'),
				},
				{
					column: 'fecha',
					operator: '<=',
					value: dayjs(date).endOf('month').format('YYYY-MM-DD'),
				},
				{
					column: 'estacion',
					operator: '=',
					value: station,
				},
			],
			condInclusives: true,
		},
		params: {},
	});

	const handlePrint = async (row: Object) => {
		if ((row as TProgress).estado !== APROBADO) {
			swal('Error', 'No hay documento dictámen para ver', 'error');
			return;
		}

		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: (row as TProgress).ruta_dictamen },
		});
		window.open(url);
	};

	const handlePass = async (row: Object) => {
		const result: TResult = await putData({
			path: `${URL.GENERIC}`,
			body: {
				table: 'ut_revision',
				datos: {
					estado: APROBADO,
					fecha: dayjs().format('YYYY-MM-DD'),
				},
			},
			params: {
				id_revision: (row as TProgress).id_revision,
			},
		});

		if (result.warningStatus) {
			swal('Error', 'No se pudo actualizar el estado', 'error');
			return;
		} else {
			swal('Éxito', 'Estado actualizado', 'success');
		}
	};

	if (isLoading)
		return (
			<Skeleton
				variant='rectangular'
				width={'100%'}
				height={200}
				sx={{ borderRadius: 2 }}
			/>
		);
	if (isError) return <Typography>Error</Typography>;

	return (
		<McTable
			headers={{
				estacion: 'Estación',
				titulo: 'Título',
				nombre: 'Estudiante',
				detalle: 'Observación',
				tutor: 'Revisor',
				fecha_creacion: 'Creación',
				fecha: 'Revisión',
				estado: 'Estado',
			}}
			rows={data || []}
			totalCols={{}}
			onPass={handlePass}
			onPrint={handlePrint}
		/>
	);
};

export default Historial;

import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { ResultType } from '@/models/Result';
import { deleteData } from '@/services/fetching';
import { Box, Typography } from '@mui/material';
import React from 'react';
import swal from 'sweetalert';
import { FormSchedule } from '../FormSchedule';

export type ScheduleDataProps = {};

const ScheduleData: React.FC<ScheduleDataProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.SCHEDULE}/all`,
		method: 'post',
	});

	const onClose = () => {
		refetch();
	};

	const onDelete = async (item: any) => {
		const result: ResultType = await deleteData({
			path: URL.SCHEDULE,
			params: { id_horario: item.id_horario },
		});

		if (!result.warningStatus) {
			swal('Éxito', 'Se eliminó el horario', 'success');
			refetch();
		}
	};

	const onEdit = (item: any) => {
		console.log('Edit schedule item', item);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>No se pudo cargar las jornadas</Typography>;

	return (
		<Box>
			<FormSchedule onClose={onClose} />
			<McTable
				headers={{
					jornada: 'Jornada',
					hora_inicio: 'Inicio',
					hora_final: 'Final',
				}}
				rows={data}
				totalCols={{}}
				onDelete={onDelete}
				// onEdit={onEdit}
			/>
		</Box>
	);
};

export default ScheduleData;

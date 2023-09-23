import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { FormPeriod } from '../FormPeriod';
import { ResultType } from '@/models/Result';
import { deleteData } from '@/services/fetching';
import swal from 'sweetalert';

export type PeriodDataProps = {};

const PeriodData: React.FC<PeriodDataProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.PERIOD}/all`,
		method: 'post',
	});

	const onClose = () => {
		refetch();
	};

	const onDelete = async (item: any) => {
		const result: ResultType = await deleteData({
			path: URL.PERIOD,
			params: { id_jornada: item.id_jornada },
		});

		if (!result.warningStatus) {
			swal('Éxito', 'Se eliminó la jornada', 'success');
			refetch();
		}
	};

	const onEdit = (item: any) => {
		console.log('Edit period item', item);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>No se pudo cargar los horarios</Typography>;

	return (
		<Box>
			<FormPeriod onClose={onClose} />
			<McTable
				headers={{
					nombre: 'Jornada',
				}}
				rows={data}
				totalCols={{}}
				onDelete={onDelete}
				// onEdit={onEdit}
			/>
		</Box>
	);
};

export default PeriodData;

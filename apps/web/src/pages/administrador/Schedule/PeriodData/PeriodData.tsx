import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { deleteData } from '@/services/fetching';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { FormPeriod } from '../FormPeriod';

export type PeriodDataProps = {
	reload: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const PeriodData: React.FC<PeriodDataProps> = ({ reload, setReload }) => {
	const { data, isLoading, isError, refetch } = useFetch({
		url: `${URL.PERIOD}/all`,
	});

	const onClose = () => {
		refetch();
	};

	const onDelete = async (item: any) => {
		const result: TResult = await deleteData({
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

	useEffect(() => {
		if (reload) refetch();
	}, [reload]);

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>No se pudo cargar los horarios</Typography>;

	return (
		<Box>
			<FormPeriod setReload={setReload} onClose={onClose} />
			<McTable
				headers={{
					nombre: 'Jornada',
				}}
				rows={data?.message?.data ?? []}
				totalCols={{}}
				onDelete={onDelete}
				// onEdit={onEdit}
			/>
		</Box>
	);
};

export default PeriodData;

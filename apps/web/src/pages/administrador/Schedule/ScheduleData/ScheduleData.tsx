import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import { TResponse, TResult } from '@/models/Fetching';
import { deleteData } from '@/services/fetching';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { FormSchedule } from '../FormSchedule';
import { TSchedule } from '@/models/Schedule';
import { Delete, Edit } from '@mui/icons-material';

export type ScheduleDataProps = {
	reload: boolean;
	setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleData: React.FC<ScheduleDataProps> = ({ reload, setReload }) => {
	const [editingItem, setEditingItem] = useState<TSchedule | null>(null);
	const { data, isLoading, isError, refetch } = useFetch({
		url: `${URL.SCHEDULE}/all`,
	});

	const onClose = () => {
		refetch();
	};

	const onDelete = async (item: any) => {
		const result: TResult = await deleteData({
			path: URL.SCHEDULE,
			params: { id_horario: item.id_horario },
		});

		if (!result.warningStatus) {
			swal('Éxito', 'Se eliminó el horario', 'success');
			refetch();
		}
	};

	const onEdit = (item: any) => {
		setEditingItem(
			data.message.data.find(
				(value: TSchedule) => value.id_horario === item.id_horario
			)
		);
	};

	useEffect(() => {
		if (reload) refetch();
	}, [reload]);

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>No se pudo cargar las jornadas</Typography>;

	return (
		<Box>
			<FormSchedule
				schedule={editingItem}
				setSchedule={setEditingItem}
				onClose={onClose}
				setReload={setReload}
			/>
			<McTable
				headers={{
					jornada: 'Jornada',
					hora_inicio: 'Inicio',
					hora_final: 'Final',
				}}
				rows={
					(data?.message?.data as Array<TSchedule>).flatMap(
						(value: TSchedule) => {
							return {
								jornada: value.jornada?.nombre ?? '',
								id_horario: value.id_horario,
								hora_inicio: value.hora_inicio.slice(0, 5),
								hora_final: value.hora_final.slice(0, 5),
							};
						}
					) ?? []
				}
				totalCols={{}}
				actions={[
					{
						tooltip: 'Eliminar jornada',
						icon: <Delete color='warning' />,
						onClick: (row) => onDelete(row),
					},
					{
						tooltip: 'Editar jornada',
						icon: <Edit color='primary' />,
						onClick: (row) => onEdit(row),
					},
				]}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		</Box>
	);
};

export default ScheduleData;

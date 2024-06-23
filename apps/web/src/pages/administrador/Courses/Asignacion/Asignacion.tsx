import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McModal } from '@/components/McModal';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import { useFetch, useInfiniteFetch } from '@/hooks/useFetch';
import { courseTutorDefault, TCourseTutor } from '@/models/CourseTutor';
import { TResult } from '@/models/Fetching';
import { deleteData } from '@/services/fetching';
import { Refresh, Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import React, { lazy, useState } from 'react';
import swal from 'sweetalert';
import { Form } from '../Gestion/Form';

export type AsignacionProps = {
	filter: string;
};

const Asignacion: React.FC<AsignacionProps> = ({ filter }) => {
	const [open, setOpen] = useState(false);
	const [preloadData, setPreloadData] = useState<TCourseTutor>(
		courseTutorDefault as TCourseTutor
	);
	const { data, isLoading, error, fetchNextPage, refetch, hasNextPage } =
		useInfiniteFetch({
			name: 'courseTutor',
			url: `${URL.COURSE_TUTOR}/all`,
			take: 10,
			skip: 0,
			q: filter,
		});

	const handleSelect = (item: any) => {
		setOpen(true);
		console.log(item);
		setPreloadData(item);
	};

	const handleDelete = async (item: any) => {
		const result: TResult = await deleteData({
			path: `${URL.COURSE_TUTOR}`,
			params: { id_curso_tutor: item.id_curso_tutor },
		});
		if (result.affectedRows > 0) {
			refetch();
			swal('Eliminado', 'Se ha eliminado el registro', 'success');
		} else {
			swal('Error', 'No se ha podido eliminar el registro', 'error');
		}
	};

	const onClose = () => {
		setOpen(false);
		setPreloadData(courseTutorDefault as TCourseTutor);
	};

	if (isLoading) return <DotsLoaders />;
	if (error) return <Typography>{error as string}</Typography>;

	return (
		<Box>
			<Typography variant='h5' component={'h2'} gutterBottom>
				Asignación de tutores
				<IconButton color='secondary' onClick={() => refetch()}>
					<Refresh />
				</IconButton>
			</Typography>
			<McTable
				headers={{
					fecha: 'Fecha',
					salon: 'Salón',
					'tutor.nombre': 'Tutor',
				}}
				rows={data?.pages.flatMap((page) => page.message.data) ?? []}
				totalCols={{}}
				onEdit={handleSelect}
				onDelete={handleDelete}
			/>
			<McModal title='Editar asignación' open={open} onClose={onClose}>
				<Form preloadData={preloadData} onClose={() => {}} />
			</McModal>
		</Box>
	);
};

export default Asignacion;

import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { deleteData } from '@/services/fetching';
import { Refresh } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { McModal } from '@/components';
import { Form } from '../Gestion/Form';
import { courseTutorDefault, TCourseTutor } from '@/models/CourseTutor';

export type AsignacionProps = Record<string, never>;

const Asignacion: React.FC<AsignacionProps> = ({}) => {
	const [open, setOpen] = useState(false);
	const [preloadData, setPreloadData] = useState<TCourseTutor>(
		courseTutorDefault as TCourseTutor
	);
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.COURSE_TUTOR}/all`,
		method: 'post',
		body: {
			table: 'ut_v_cursotutor',
			sort: {
				fecha: 'desc',
				id_curso: 'asc',
				id_jornada: 'asc',
				id_horario: 'asc',
			},
		},
	});

	const handleSelect = (item: any) => {
		setOpen(true);
		console.log(item);
		setPreloadData(item);
	};

	const handleDelete = async (item: any) => {
		const result: TResult = await deleteData({
			path: URL.COURSE_TUTOR,
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
	if (isError) return <Typography>Error</Typography>;

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
					n_curso: 'Curso',
					salon: 'Salón',
					n_jornada: 'Jornada',
					hora_inicio: 'Inicio',
					docente: 'Docente',
				}}
				rows={data}
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

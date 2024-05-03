import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { deleteData } from '@/services/fetching';
import { Refresh } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import swal from 'sweetalert';

export type AsignacionProps = Record<string, never>;

const Asignacion: React.FC<AsignacionProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.COURSE_TUTOR}/all`,
		method: 'post',
		body: {
			table: 'ut_v_cursotutor',
			sort: {
				fecha: 'desc',
				// id_curso: 'asc',
				id_jornada: 'asc',
				id_horario: 'asc',
			},
		},
	});

	const handleSelect = (item: any) => {};

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
		</Box>
	);
};

export default Asignacion;

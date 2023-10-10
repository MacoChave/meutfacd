import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { EmptyReview } from '@/components/EmptyReview';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { style } from '@/themes/styles';
import { Box, TextField, Typography } from '@mui/material';

const Estacion5 = () => {
	const {
		data: revision,
		isLoading,
		isError,
	} = useCustomFetch({
		url: `${URL.REVIEW}/one`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'dias',
				'fecha_curso',
				'estado',
				'tutor',
				'salon',
				'id_tutor',
			],
			order: {
				fecha: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 6,
		},
	});

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	if (!revision) return <EmptyReview title='Cita a previos internos' />;

	return (
		<>
			<Contenedor title='Cita a previos internos'>
				<Box sx={style}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<TextField
							variant='standard'
							label='Catedrático'
							InputProps={{
								disabled: true,
							}}
							value={revision?.tutor || ''}
						/>
						<TextField
							variant='standard'
							label='Fecha'
							InputProps={{
								disabled: true,
							}}
							value={revision?.fecha_curso || ''}
						/>
						<TextField
							variant='standard'
							label='Horario'
							InputProps={{
								disabled: true,
							}}
							value={revision?.dias || ''}
						/>
						<TextField
							variant='standard'
							label='Salón'
							InputProps={{
								disabled: true,
							}}
							value={revision?.salon || ''}
						/>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion5;

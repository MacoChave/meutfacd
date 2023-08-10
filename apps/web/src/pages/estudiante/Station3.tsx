import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { style } from '@/themes/styles';
import { FileDownload } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

const Estacion3 = () => {
	const {
		data: asignacion,
		isLoading,
		isError,
	} = useCustomFetch({
		url: `${URL.ASSIGNMENT}/one`,
		method: 'post',
		body: {
			table: 'ut_v_asignacion',
			columns: [
				'id_curso_tutor',
				'salon',
				'hora_inicio',
				'hora_final',
				'uj_nombre',
				'es_aprobado',
				'ruta_certificado',
				'u_nombre',
			],
			limit: 1,
		},
	});

	if (isLoading) return <p>Cargando...</p>;
	if (isError) return <p>Error</p>;

	return (
		<>
			<Contenedor title='Curso: Elaboración y planeación de tesis'>
				<Box sx={style}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<TextField
							variant='filled'
							label='Catedrático'
							value={asignacion.tt_nombre || 'No asignado'}
						/>
						<TextField
							variant='filled'
							label='Jornada'
							value={asignacion.uj_nombre || 'No asignado'}
						/>
						<TextField
							variant='filled'
							label='Horario'
							value={`${asignacion.hora_inicio || 'Inicio'} - ${
								asignacion.hora_final || 'Final'
							}`}
						/>
						<TextField
							variant='filled'
							label='Salón'
							value={asignacion.salon || 'No asignado'}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<Box sx={boxStyle}>
							<Typography>Resultado</Typography>
							<Chip
								label={
									asignacion.es_aprobado === undefined
										? 'En espera'
										: asignacion.es_aprobado
										? 'Aprobado'
										: 'Reprobado'
								}
								color={
									asignacion.es_aprobado === undefined
										? 'primary'
										: asignacion.es_aprobado
										? 'success'
										: 'warning'
								}
							/>
						</Box>
						<Box sx={boxStyle}>
							<Typography>Certificado</Typography>
							<IconButton color='primary'>
								<FileDownload />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion3;

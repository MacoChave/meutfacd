import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { REVISION } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { style } from '@/themes/styles';
import { getChipColor, getChipLabel } from '@/utils/formatHandler';
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
			],
			order: {
				fecha_revision: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 3,
		},
	});

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

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
							variant='standard'
							label='Catedrático'
							value={asignacion?.tutor ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Jornada'
							value={asignacion?.jornada ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Horario'
							value={`${asignacion?.hora_inicio ?? 'Inicio'} - ${
								asignacion?.hora_final ?? 'Final'
							}`}
						/>
						<TextField
							variant='standard'
							label='Días'
							value={asignacion?.dias ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Salón'
							value={asignacion?.salon ?? 'No asignado'}
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
								label={getChipLabel(asignacion.estado)}
								color={getChipColor(asignacion.estado)}
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

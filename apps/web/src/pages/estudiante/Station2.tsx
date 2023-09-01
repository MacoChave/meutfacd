import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { APROBADO, RECHAZADO, REVISION } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { style } from '@/themes/styles';
import { getChipColor, getChipLabel } from '@/utils/formatHandler';
import { Download, FileDownload, UploadFile } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

const Estacion2 = () => {
	const {
		data: asignacion,
		isLoading,
		isError,
	} = useCustomFetch({
		url: `${URL.ASSIGNMENT}/one`,
		method: 'post',
		body: {},
		params: {
			estacion: 2,
		},
	});

	if (isLoading) return <p>Cargando...</p>;
	if (isError) return <p>Error</p>;

	return (
		<>
			<Contenedor title='Curso: Introducción a la planeación científica'>
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
						<Box sx={boxStyle}>
							<Typography>Presentar asesor</Typography>
							<IconButton color='primary'>
								<UploadFile />
							</IconButton>
						</Box>
						<Box sx={boxStyle}>
							<Typography>Nombramiento de asesor</Typography>
							<IconButton color='primary'>
								<Download />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion2;

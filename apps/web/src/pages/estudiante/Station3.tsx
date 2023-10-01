import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { ReviewType } from '@/models/Review';
import { postData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { getChipColor, getChipLabel } from '@/utils/formatHandler';
import { Chat } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

const Estacion3 = () => {
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
			sort: {
				fecha: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 3,
		},
	});

	const createChat = async () => {
		const data = await postData({
			path: URL.CHAT,
			params: { user_id: (revision as ReviewType).id_tutor },
		});
		console.log(data);
	};

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
						{revision?.id_tutor && (
							<IconButton
								sx={{ alignSelf: 'flex-start' }}
								color='info'
								title='Crear chat'
								onClick={createChat}>
								<Chat />
							</IconButton>
						)}
						<TextField
							variant='standard'
							label='Catedrático'
							value={revision?.tutor ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Jornada'
							value={revision?.jornada ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Horario'
							value={`${revision?.hora_inicio ?? 'Inicio'} - ${
								revision?.hora_final ?? 'Final'
							}`}
						/>
						<TextField
							variant='standard'
							label='Días'
							value={revision?.dias ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Salón'
							value={revision?.salon ?? 'No asignado'}
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
								label={getChipLabel(revision.estado)}
								color={getChipColor(revision.estado)}
							/>
						</Box>
						{/* <Box sx={boxStyle}>
							<Typography>Certificado</Typography>
							<IconButton color='primary'>
								<FileDownload />
							</IconButton>
						</Box> */}
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion3;

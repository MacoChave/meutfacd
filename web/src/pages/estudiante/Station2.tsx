import { Download, FileDownload, UploadFile } from '@mui/icons-material';
import {
	Box,
	Card,
	Chip,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
	pb: 4,
};

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

const Station2 = () => {
	return (
		<>
			<Card>
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Curso: Introducción a la planeación científica
				</Typography>
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
							value='Gustavo Poveda'
						/>
						<TextField
							variant='filled'
							label='Jornada'
							value='Vespertina'
						/>
						<TextField
							variant='filled'
							label='Horario'
							value='15:00'
						/>
						<TextField
							variant='filled'
							label='Salón'
							value='meet.google.com/pxy-jblc-vgn'
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
							<Chip label='Aprobado' color='success' />
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
			</Card>
		</>
	);
};

export default Station2;

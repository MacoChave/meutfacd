import {
	CalendarToday,
	Check,
	Delete,
	Download,
	Message,
} from '@mui/icons-material';
import {
	Chip,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import MyModal from '../../components/Modal';
import { useState } from 'react';

type ProgressType = {
	estacion: string;
	evaluador: string;
	fecha_carga: string;
};

const rows: ProgressType[] = [
	{
		estacion: '20145296',
		evaluador: 'Estudiante 1',
		fecha_carga: '2021-10-10',
	},
	{
		estacion: '20145296',
		evaluador: 'Estudiante 2',
		fecha_carga: '2021-10-10',
	},
	{
		estacion: '20145296',
		evaluador: 'Estudiante 2',
		fecha_carga: '2021-10-10',
	},
	{
		estacion: '20145296',
		evaluador: 'Estudiante 2',
		fecha_carga: '2021-10-10',
	},
	{
		estacion: '20145296',
		evaluador: 'Estudiante 2',
		fecha_carga: '2021-10-10',
	},
	{
		estacion: '20145296',
		evaluador: 'Estudiante 2',
		fecha_carga: '2021-10-10',
	},
];

const getChipColor = (estado: string) => {
	switch (estado) {
		case 'Enviado':
			return 'primary';
		case 'Aprobado':
			return 'success';
		case 'Previo':
			return 'error';
	}
};

const chipsByState = (estado: string) => {
	return (
		<Chip sx={{ width: 100 }} label={estado} color={getChipColor(estado)} />
	);
};

const Citas = () => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({} as ProgressType);
	const handleShow = (row: ProgressType) => {
		setOpen(true);
		setRow(row);
	};
	return (
		<>
			<TableContainer component={Paper}>
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Raquel Angulo
				</Typography>
				<Typography
					variant='h5'
					component='h3'
					textAlign='center'
					py={4}>
					Citas programadas
				</Typography>
				<Table
					sx={{ minWidth: 250, maxWidth: 600, mx: 'auto' }}
					aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Carné</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell>Fecha de carga</TableCell>
							<TableCell>Revisión</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow
								key={index}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}>
								<TableCell component='th' scope='row'>
									{row.estacion}
								</TableCell>
								<TableCell>{row.evaluador}</TableCell>
								<TableCell>{row.fecha_carga}</TableCell>
								<TableCell>
									<IconButton
										color='primary'
										onClick={() => handleShow(row)}>
										<CalendarToday />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() => handleShow(row)}>
										<Download />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() => handleShow(row)}>
										<Message />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() => {}}>
										<Check />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() => {}}>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<MyModal open={open} title='Observaciones' setOpen={setOpen}>
				<Typography textAlign='center'>Detalles</Typography>
			</MyModal>
		</>
	);
};

export default Citas;

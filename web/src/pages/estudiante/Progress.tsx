import { Visibility } from '@mui/icons-material';
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
	estado: string;
	observacion: string;
};

const rows: ProgressType[] = [
	{
		estacion: 'Estación 1',
		evaluador: 'Profesor 1',
		fecha_carga: '2021-10-10',
		estado: 'Previo',
		observacion: 'Ver observación',
	},
	{
		estacion: 'Estación 1',
		evaluador: 'Profesor 1',
		fecha_carga: '2021-10-10',
		estado: 'Aprobado',
		observacion: 'Ver observación',
	},
	{
		estacion: 'Estación 2',
		evaluador: 'Profesor 2',
		fecha_carga: '2021-10-10',
		estado: 'Aprobado',
		observacion: 'Ver observación',
	},
	{
		estacion: 'Estación 3',
		evaluador: 'Profesor 3',
		fecha_carga: '2021-10-10',
		estado: 'Aprobado',
		observacion: 'Ver observación',
	},
	{
		estacion: 'Estación 4',
		evaluador: 'Profesor 4',
		fecha_carga: '2021-10-10',
		estado: 'Enviado',
		observacion: 'Ver observación',
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

const Progress = () => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({} as ProgressType);
	const handleShow = (row: ProgressType) => {
		setOpen(true);
		setRow(row);
	};
	return (
		<>
			<TableContainer component={Paper}>
				<Typography variant='h4' textAlign='center' py={4}>
					Mi progreso
				</Typography>
				<Table
					sx={{ minWidth: 250, maxWidth: 600, mx: 'auto' }}
					aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Estación</TableCell>
							<TableCell>Evaluador</TableCell>
							<TableCell>Fecha de carga</TableCell>
							<TableCell>Estado</TableCell>
							<TableCell>Observación</TableCell>
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
									Estación 1
								</TableCell>
								<TableCell>Profesor 1</TableCell>
								<TableCell>2021-10-10</TableCell>
								<TableCell>
									{chipsByState(row.estado)}
								</TableCell>
								<TableCell>
									<IconButton
										color='primary'
										onClick={() => handleShow(row)}>
										<Visibility />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<MyModal open={open} title='Observaciones' setOpen={setOpen}>
				<Typography textAlign='center'>{row.observacion}</Typography>
			</MyModal>
		</>
	);
};

export default Progress;

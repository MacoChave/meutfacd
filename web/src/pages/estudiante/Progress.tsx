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
import Dialogo from '../../components/Modal';
import { useState } from 'react';

type ProgressType = {
	estacion: string;
	evaluador: string;
	fecha_carga: string;
	estado: string;
	observacion: string;
};

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
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Mi progreso
				</Typography>
				<Table
					sx={{ minWidth: 250, maxWidth: 600, mx: 'auto' }}
					aria-label='simple table'>
					<TableHead>
						<TableRow>
							{Object.keys(rows[0]).map((key, index) => (
								<TableCell key={index}>
									{key.toUpperCase()}
								</TableCell>
							))}
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
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				<Typography variant='body2'>{row.fecha_carga}</Typography>
				<Typography variant='body1'>{row.observacion}</Typography>
			</Dialogo>
		</>
	);
};

const rows: ProgressType[] = [
	{
		estacion: 'Estación 1',
		evaluador: 'Profesor 1',
		fecha_carga: '2021-10-10',
		estado: 'Previo',
		observacion:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat accumsan fermentum. Mauris faucibus molestie dolor a dignissim. Nam enim augue, pulvinar ac egestas sed, tincidunt nec tellus. Fusce non leo ac purus viverra tincidunt et et velit. Nulla ac leo suscipit, posuere urna nec, imperdiet erat. Nulla dapibus arcu at libero venenatis vulputate. Ut laoreet augue ut varius ultricies.',
	},
	{
		estacion: 'Estación 1',
		evaluador: 'Profesor 1',
		fecha_carga: '2021-10-10',
		estado: 'Aprobado',
		observacion:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat accumsan fermentum. Mauris faucibus molestie dolor a dignissim. Nam enim augue, pulvinar ac egestas sed, tincidunt nec tellus. Fusce non leo ac purus viverra tincidunt et et velit. Nulla ac leo suscipit, posuere urna nec, imperdiet erat. Nulla dapibus arcu at libero venenatis vulputate. Ut laoreet augue ut varius ultricies.',
	},
	{
		estacion: 'Estación 2',
		evaluador: 'Profesor 2',
		fecha_carga: '2021-10-10',
		estado: 'Aprobado',
		observacion:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat accumsan fermentum. Mauris faucibus molestie dolor a dignissim. Nam enim augue, pulvinar ac egestas sed, tincidunt nec tellus. Fusce non leo ac purus viverra tincidunt et et velit. Nulla ac leo suscipit, posuere urna nec, imperdiet erat. Nulla dapibus arcu at libero venenatis vulputate. Ut laoreet augue ut varius ultricies.',
	},
	{
		estacion: 'Estación 3',
		evaluador: 'Profesor 3',
		fecha_carga: '2021-10-10',
		estado: 'Aprobado',
		observacion:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat accumsan fermentum. Mauris faucibus molestie dolor a dignissim. Nam enim augue, pulvinar ac egestas sed, tincidunt nec tellus. Fusce non leo ac purus viverra tincidunt et et velit. Nulla ac leo suscipit, posuere urna nec, imperdiet erat. Nulla dapibus arcu at libero venenatis vulputate. Ut laoreet augue ut varius ultricies.',
	},
	{
		estacion: 'Estación 4',
		evaluador: 'Profesor 4',
		fecha_carga: '2021-10-10',
		estado: 'Enviado',
		observacion:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat accumsan fermentum. Mauris faucibus molestie dolor a dignissim. Nam enim augue, pulvinar ac egestas sed, tincidunt nec tellus. Fusce non leo ac purus viverra tincidunt et et velit. Nulla ac leo suscipit, posuere urna nec, imperdiet erat. Nulla dapibus arcu at libero venenatis vulputate. Ut laoreet augue ut varius ultricies.',
	},
];

export default Progress;

import { CalendarToday, Check, Download, Message } from '@mui/icons-material';
import {
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
import Dialogo from '../../../components/Modal';
import React, { ReactNode, useState } from 'react';
import AgregarComentario from '../../../components/FijarFecha';
import FijarFecha from '../../../components/Comentar';

type ProgressType = {
	estacion: string;
	evaluador: string;
	fecha_carga: string;
};

enum Operation {
	RECALENDARIZAR = 'Recalendarizar',
	DESCARGAR = 'Descargar',
	COMENTAR = 'Comentar',
	APROBAR = 'Aprobar',
}

export type CitasProps = {};

const Citas: React.FC<CitasProps> = ({}) => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState<ProgressType>({} as ProgressType);
	const [modalContent, setmodalContent] = useState<ReactNode>(<></>);

	const handleShow = (row: ProgressType, operation: Operation) => {
		switch (operation) {
			case Operation.RECALENDARIZAR:
				setmodalContent(<FijarFecha />);
				break;
			case Operation.COMENTAR:
				setmodalContent(<AgregarComentario />);
				break;
			default:
				break;
		}
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
							<TableCell>Fecha de cita</TableCell>
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
										onClick={() =>
											handleShow(
												row,
												Operation.RECALENDARIZAR
											)
										}>
										<CalendarToday />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() =>
											console.log('Download file is not implemented')
										}>
										<Download />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() =>
											handleShow(row, Operation.COMENTAR)
										}>
										<Message />
									</IconButton>
									<IconButton
										color='primary'
										onClick={() => {}}>
										<Check />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				{modalContent}
			</Dialogo>
		</>
	);
};

export default Citas;
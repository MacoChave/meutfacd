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
import { useCustomFetch } from '@/hooks/useFetch';
import { URL } from '@/api/server';

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

	const {
		data: revisiones,
		isLoading,
		isError,
		refetch,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'titulo',
				'fecha',
				'detalle',
				'estado',
				'tutor',
				'ruta_perfil',
				'id_tutor',
			],
			sort: {
				fecha: 'ASC',
			},
		},
		params: {
			estacion: 6,
		},
	});

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
					py={4}></Typography>
				<Typography
					variant='h5'
					component='h3'
					textAlign='center'
					py={4}></Typography>
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
					<TableBody></TableBody>
				</Table>
			</TableContainer>
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				{modalContent}
			</Dialogo>
		</>
	);
};

export default Citas;

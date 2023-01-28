import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import Contenedor from '../../components/Card';
import { Check, Download, MenuBook, Message } from '@mui/icons-material';
import { ReactNode, useState } from 'react';
import Dialogo from '../../components/Modal';
import FijarFecha from '../../components/Comentar';
import ShowPDF from '../../components/ShowPDF';
import AgregarComentario from '../../components/FijarFecha';

type TesisListType = {
	carnet: number;
	nombre: string;
	fecha: string;
};

enum Operation {
	LEER = 'Leer',
	COMENTAR = 'Comentar',
	APROBACION = 'Aprobación',
	DESCARGAR = 'Descargar',
}

const RevisionDocumento = () => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState<TesisListType>({} as TesisListType);
	const [modalContent, setModalContent] = useState<ReactNode>(<></>);

	const handleShow = (row: TesisListType, operation: Operation) => {
		switch (operation) {
			case Operation.COMENTAR:
				setModalContent(<AgregarComentario />);
				break;
			case Operation.LEER:
				setModalContent(<ShowPDF />);
				break;
			default:
				break;
		}
		setOpen(true);
		setRow(row);
	};

	return (
		<>
			<Contenedor title='Revisar documentos'>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{Object.keys(rows[0]).map((key, index) => (
									<TableCell key={index}>
										{key.toUpperCase()}
									</TableCell>
								))}
								<TableCell>REVISIÓN Y APROBACIÓN</TableCell>
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
									{Object.values(row).map((value, index) => (
										<TableCell key={index}>
											{value}
										</TableCell>
									))}
									<TableCell>
										<Box>
											<IconButton
												color='primary'
												onClick={() =>
													handleShow(
														row,
														Operation.LEER
													)
												}>
												<MenuBook />
											</IconButton>
											<IconButton
												color='primary'
												onClick={() => {}}>
												<Download />
											</IconButton>
											<IconButton
												color='primary'
												onClick={() =>
													handleShow(
														row,
														Operation.COMENTAR
													)
												}>
												<Message />
											</IconButton>
											<IconButton
												color='primary'
												onClick={() => {}}>
												<Check />
											</IconButton>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Contenedor>
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				{modalContent}
			</Dialogo>
		</>
	);
};

const rows: TesisListType[] = [
	{
		nombre: 'Estudiante 1',
		carnet: 201452596,
		fecha: '2023-01-16',
	},
	{
		nombre: 'Estudiante 2',
		carnet: 201546490,
		fecha: '2023-01-04',
	},
	{
		nombre: 'Estudiante 3',
		carnet: 201476902,
		fecha: '2023-01-24',
	},
	{
		nombre: 'Estudiante 4',
		carnet: 200288346,
		fecha: '2023-01-15',
	},
	{
		nombre: 'Estudiante 5',
		carnet: 201035772,
		fecha: '2023-01-20',
	},
];

export default RevisionDocumento;

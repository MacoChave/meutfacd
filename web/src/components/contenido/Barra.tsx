import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { BotonSecundario } from '../controles/Boton';
import { SyntheticEvent } from 'react';

type BarraProps = {
	titulo: string;
	handleAgregar: (event: SyntheticEvent) => void;
};

const Barra = ({ titulo, handleAgregar }: BarraProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
				gap: 1,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: 2,
					flex: 1,
				}}>
				<Typography variant='h4'>{titulo}</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start',
						gap: 2,
					}}>
					{/* <BotonSecundario>
						<>Cargar XLSX</>
					</BotonSecundario> */}
					<BotonSecundario handleClick={() => {}}>
						<>Descargar XLSX</>
					</BotonSecundario>
				</Box>
			</Box>
			<Button
				variant='contained'
				startIcon={<Add />}
				onClick={handleAgregar}>
				Agregar
			</Button>
		</Box>
	);
};

export default Barra;

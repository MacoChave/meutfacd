import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { BotonSecundario } from '../controles/Boton';

type BarraProps = {
	titulo: string;
};

const Barra = ({ titulo }: BarraProps) => {
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
					<BotonSecundario>
						<>Descargar XLSX</>
					</BotonSecundario>
				</Box>
			</Box>
			<Button variant='contained' startIcon={<Add />}>
				Agregar
			</Button>
		</Box>
	);
};

export default Barra;

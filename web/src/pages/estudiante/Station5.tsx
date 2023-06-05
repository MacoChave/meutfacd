import { Contenedor } from '@/components';
import { Box, TextField } from '@mui/material';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(1, 1fr)',
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

const Estacion5 = () => {
	return (
		<>
			<Contenedor title='Cita a previos internos'>
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
							value='Anselma León Teruel'
						/>
						<TextField
							variant='filled'
							label='Fecha'
							value='10-jun-2023'
						/>
						<TextField
							variant='filled'
							label='Horario'
							value='15:00'
						/>
						<TextField
							variant='filled'
							label='Salón'
							value='Edificio S6 - 300'
						/>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion5;

import { Contenedor } from '@/components';
import { style } from '@/themes/styles';
import { Box, Button } from '@mui/material';

const Finalizar = () => {
	return (
		<>
			<Contenedor title='Formulario de finalización'>
				<Box sx={style}>
					<Button variant='contained' color='primary'>
						Solicitar impresión
					</Button>
				</Box>
			</Contenedor>
		</>
	);
};

export default Finalizar;

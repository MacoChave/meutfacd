import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import FileChooser from '../../components/FileChooser';
import Contenedor from '../../components/Card';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Station4 = () => {
	const ref = useRef<HTMLInputElement>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(file);
	};
	return (
		<>
			<Contenedor title='Comisión y estilo'>
				<Box sx={style}>
					<Box>
						<Typography variant='h6'>Detalle del previo</Typography>
						<Typography>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Enim necessitatibus vero similique voluptatem,
							maiores labore numquam quasi a, molestias expedita
							nesciunt impedit consequatur ducimus ullam doloribus
							officia facilis illum non?
						</Typography>
					</Box>
					<Box>
						<TextField
							fullWidth
							label='Tema'
							placeholder='Descripción del tema'
							variant='filled'
							defaultValue='Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
						/>
					</Box>
					<Box
						sx={{
							gridColumnStart: 2,
							gridRow: '1 / span 2',
							p: 2,
							placeSelf: 'center',
						}}>
						<FileChooser />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Station4;

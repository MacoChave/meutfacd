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

const Station1 = () => {
	return (
		<>
			<Contenedor title='Presentar punto de tesis'>
				<Box sx={style}>
					<Box>
						<Typography variant='h6'>Detalle del previo</Typography>
						<Typography>
							{/* Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Enim necessitatibus vero similique voluptatem,
							maiores labore numquam quasi a, molestias expedita
							nesciunt impedit consequatur ducimus ullam doloribus
							officia facilis illum non? */}
						</Typography>
					</Box>
					<Box>
						<TextField
							fullWidth
							label='Descripción del punto de tesis'
							multiline
							placeholder='Descripción del tema'
							variant='filled'
							defaultValue='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ipsum quidem dolore animi libero tempore deleniti maxime eos adipisci ea in sit distinctio incidunt aperiam, at ullam cupiditate nisi corporis!'
						/>
					</Box>
					<Box
						sx={{
							gridColumnStart: 2,
							gridRow: '1 / span 2',
							p: 2,
							justifySelf: 'center',
							alignSelf: 'center',
						}}>
						<FileChooser />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Station1;

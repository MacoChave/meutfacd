import { Box, Typography, TextField, Button } from '@mui/material';

const AgregarComentario = () => {
	return (
		<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
			<Typography
				variant='h5'
				component='h2'
				sx={{ gridColumn: '1 / span 2' }}>
				Agregar comentario
			</Typography>
			<TextField
				id='outlined-multiline-static'
				label='Comentario'
				multiline
				rows={4}
				defaultValue='Default Value'
				variant='outlined'
				sx={{ gridColumn: '1 / span 2' }}
			/>
			<Button variant='contained' type='submit' sx={{ gridColumn: '2' }}>
				Enviar comentario
			</Button>
		</Box>
	);
};

export default AgregarComentario;

import { Box, Typography, TextField, Button } from '@mui/material';

const FijarFecha = () => {
	return (
		<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
			<Typography
				variant='h5'
				component='h2'
				sx={{ gridColumn: '1 / span 2' }}>
				Calendarizar cita
			</Typography>
			<TextField
				id='date'
				label='Fecha de cita'
				type='date'
				defaultValue={new Date().toISOString().slice(0, 10)}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='time'
				label='Hora de cita'
				type='time'
				defaultValue={new Date().toISOString().slice(11, 16)}
				InputLabelProps={{
					shrink: true,
				}}
				inputProps={{
					step: 300, // 5 min
				}}
			/>
			<Button variant='contained' type='submit' sx={{ gridColumn: '2' }}>
				Guardar
			</Button>
		</Box>
	);
};

export default FijarFecha;

import { Box, Button, Card, TextField, Typography } from '@mui/material';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Resumen = () => {
	return (
		<>
			<Card>
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Leonor de la Luz
				</Typography>
				<Box>
					<TextField label='Ciclo lectivo' value='2023' />
					<TextField label='Estudiantes atendidos' value='311' />
				</Box>
				<Box sx={style}>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<TextField
							variant='filled'
							label='Jornada'
							value='Vespertino'
						/>
						<TextField
							variant='filled'
							label='Horario'
							value='15:00 - 16:00'
						/>
					</Box>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<TextField
							variant='filled'
							label='Evaluador'
							value='Raquel Angulo'
						/>
						<Button variant='contained'>Finalizar</Button>
					</Box>
					<Box>
						<Typography variant='h6' component='h3'>
							Listado de estudiantes
						</Typography>
					</Box>
					<Box></Box>
				</Box>
			</Card>
		</>
	);
};

export default Resumen;

import { Box, Card, TextField, Typography } from '@mui/material';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
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

const Station5 = () => {
	return (
		<>
			<Card>
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Formulario para solicitar exámen público
				</Typography>
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}></Box>
				</Box>
			</Card>
		</>
	);
};

export default Station5;

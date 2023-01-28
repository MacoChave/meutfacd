import {
	Box,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import Contenedor from '../../components/Card';

const style = {
	display: 'flex' as 'flex',
	flexDirection: 'column' as 'column',
	gap: 4,
	width: '70vw',
	mx: 'auto',
};

const Resumen = () => {
	return (
		<>
			<Contenedor title='Resumen por ciclo lectivo'>
				<Box sx={style}>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<FormControl sx={{ flex: 1 }}>
							<InputLabel>Ciclo lectivo</InputLabel>
							<Select variant='filled'>
								{[
									2010, 2011, 2012, 2013, 2014, 2015, 2016,
									2017, 2018, 2019, 2020, 2021, 2022, 2023,
								].map((item) => (
									<MenuItem value={item}>{item}</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							sx={{ flex: 1 }}
							variant='filled'
							value='311'
							label='Estudiantes atendidos'
							inputProps={{ readOnly: true }}
						/>
					</Box>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(300px, 1fr))',
						}}>
						{rows.map((row, index) => (
							<Box
								key={index}
								sx={{
									p: 2,
									m: 2,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 2,
									boxShadow: 2,
								}}
								bgcolor='#00225B'
								color='#fff'>
								<Typography variant='h6'>
									{row.estacion}
								</Typography>
								<Box>
									<Box
										sx={{
											display: 'flex',
											gap: 4,
											justifyContent: 'center',
										}}>
										<Box>
											<Typography variant='h4'>
												{row.aprobados}
											</Typography>
											<Typography variant='subtitle1'>
												Aprobados
											</Typography>
										</Box>
										<Box>
											<Typography variant='h4'>
												{row.previo}
											</Typography>
											<Typography variant='subtitle1'>
												Previo
											</Typography>
										</Box>
										<Box>
											<Typography variant='h4'>
												{row.rechazos || row.espera}
											</Typography>
											<Typography variant='subtitle1'>
												Rechazado
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

const rows = [
	{
		estacion: 'Estacion 1',
		aprobados: 12,
		previo: 5,
		rechazos: 3,
	},
	{
		estacion: 'Estacion 2',
		aprobados: 12,
		previo: 0,
		rechazos: 5,
	},
	{
		estacion: 'Estacion 3',
		aprobados: 16,
		previo: 0,
		rechazos: 7,
	},
	{
		estacion: 'Estacion 4',
		aprobados: 11,
		previo: 10,
		rechazos: 5,
	},
	{
		estacion: 'Estacion 5',
		aprobados: 17,
		previo: 9,
		rechazos: 13,
	},
	{
		estacion: 'Impresiones',
		aprobados: 8,
		previo: 19,
		espera: 17,
	},
];

export default Resumen;

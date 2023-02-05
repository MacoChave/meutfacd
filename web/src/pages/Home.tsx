import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const estacionItem = (
		title: string,
		subtitle: string = '',
		img: string,
		alt: string
	) => (
		<Box sx={{}}>
			<Box
				sx={{
					background: '#00225B',
					color: 'white',
					py: 2,
					textAlign: 'center',
				}}>
				<Typography
					sx={{ textTransform: 'uppercase' }}
					variant='subtitle1'>
					{title}
				</Typography>
				{subtitle && (
					<Typography
						sx={{ textTransform: 'uppercase' }}
						variant='subtitle2'>
						{subtitle}
					</Typography>
				)}
			</Box>
			<Box sx={{ width: '70%', mx: 'auto' }}>
				<img
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
					}}
					src={img}
					alt={img}
				/>
			</Box>
		</Box>
	);
	const estacionItem2 = (title: string, img: string, alt: string) => {
		return estacionItem(title, '', img, alt);
	};

	return (
		<Box sx={{ maxWidth: '100vw' }}>
			<Box sx={{ width: '100%' }}>
				<img
					src='https://derecho.cloud/wp-content/uploads/2022/08/Header-Derecho-Cloud.png'
					alt='Portada Derecho'
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
					}}
				/>
			</Box>
			<Box sx={{ textAlign: 'right' }}>
				<Button
					variant='text'
					color='primary'
					onClick={() =>
						navigate('/login', {
							state: {
								from: '/',
							},
						})
					}>
					Iniciar sesión
				</Button>
			</Box>
			<Box>
				<Box sx={{ py: 4, textAlign: 'center' }}>
					<Typography
						variant='h4'
						sx={{ textTransform: 'uppercase' }}>
						Unidad de tesis
					</Typography>
					<Typography variant='h5'>Flujo de procesos</Typography>
				</Box>
				{estacionItem2(
					'Recepción de punto de tesis',
					'https://i.ibb.co/mzs6FRY/Estacion1.png',
					'Flujo del proceso de recepción del punto de tesis'
				)}
				{estacionItem(
					'Curso',
					'Inducción a la planeación científica',
					'https://i.ibb.co/px6CJ26/Estacion2.png',
					'Flujo del proceso del curso de inducción a la planeación científica'
				)}
				{estacionItem(
					'Curso',
					'Elaboración y presentación de tesis',
					'https://i.ibb.co/px6CJ26/Estacion2.png',
					'Flujo del proceso del curso de elaboración y presentación de tesis'
				)}
				{estacionItem2(
					'Comisión y estilo',
					'https://i.ibb.co/mzs6FRY/Estacion1.png',
					'Flujo del proceso de comisión y estilo'
				)}
				{estacionItem2(
					'Previos internos',
					'https://i.ibb.co/ZXtWgL3/Estacion5.png',
					'Flujo del proceso de previos internos'
				)}
				{/* {estacionItem2(
					'Finalizar proceso',
					'',
					'Flujo del proceso de finalziación de proces'
				)} */}
			</Box>
		</Box>
	);
};

export default Home;

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InfoEstacion } from './components/InfoEstacion';
import { SesionMenu } from './components/SesionMenu';

const Home = (props: any) => {
	const navigate = useNavigate();

	const handleLogin = (rol: string) => {
		navigate(`/login/${rol}`);
	};

	const handleLogup = (rol: string) => {
		navigate(`/logup/${rol}`);
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
				<SesionMenu
					handleLogin={handleLogin}
					handleLogup={handleLogup}
				/>
			</Box>
			<Box>
				<Box sx={{ py: 4, textAlign: 'center' }}>
					<Typography
						variant='h2'
						sx={{ textTransform: 'uppercase' }}>
						Unidad de tesis
					</Typography>
					<Typography variant='h4'>Flujo de procesos</Typography>
				</Box>
				<InfoEstacion
					title='Recepción de punto de tesis'
					img='https://i.ibb.co/mzs6FRY/Estacion1.png'
					alt='Flujo del proceso de recepción del punto de tesis'
				/>
				<InfoEstacion
					title='Curso'
					subtitle='Inducción a la planeación científica'
					img='https://i.ibb.co/px6CJ26/Estacion2.png'
					alt='Flujo del proceso del curso inducción a la planeación científica'
				/>
				<InfoEstacion
					title='Curso'
					subtitle='Elaboración y presentación de tesis'
					img='https://i.ibb.co/px6CJ26/Estacion2.png'
					alt='Flujo del proceso del curso elaboración y presentación de tesis'
				/>
				<InfoEstacion
					title='Comisión y estilo'
					img='https://i.ibb.co/mzs6FRY/Estacion1.png'
					alt='Flujo del proceso de comisión y estilo'
				/>
				<InfoEstacion
					title='Previos internos'
					img='https://i.ibb.co/ZXtWgL3/Estacion5.png'
					alt='Flujo del proceso de previos internos'
				/>
				<InfoEstacion
					title='Finalización del proceso'
					img='https://i.ibb.co/mzs6FRY/Estacion1.png'
					alt='Flujo del proceso de finalización del proceso'
				/>
			</Box>
			<Box>
				<Typography textAlign='center'>
					Administración 2021-2025 Decano Henry Arraiga
				</Typography>
			</Box>
		</Box>
	);
};

export default Home;
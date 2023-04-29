import { Box, Menu, MenuItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginMenu = ({
	handleLogin,
}: {
	handleLogin: (tipo: number) => void;
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id='login-boton'
				aria-controls={open ? 'login-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={(event) => setAnchorEl(event.currentTarget)}>
				Iniciar sesión
			</Button>
			<Menu
				id='login-menu'
				aria-labelledby='login-boton'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}>
				<MenuItem onClick={() => handleLogin(1)}>Estudiante</MenuItem>
				<MenuItem onClick={() => handleLogin(2)}>
					Administrativo
				</MenuItem>
			</Menu>
		</div>
	);
};

const Home = (props: any) => {
	const navigate = useNavigate();

	const handleLogin = (tipo: number) => {
		navigate(`/login/${tipo}`, { replace: true });
	};

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
				<LoginMenu handleLogin={handleLogin} />
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
			<Box>
				<Typography textAlign='center'>
					Administración 2021-2025 Decano Henry Arraiga
				</Typography>
			</Box>
		</Box>
	);
};

export default Home;

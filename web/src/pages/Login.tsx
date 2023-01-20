import {
	Box,
	Button,
	Card,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { ToolbarWithoutSesion } from '../components/Toolbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	return (
		<>
			<ToolbarWithoutSesion />
			<Box component='main' sx={{ p: 3 }}>
				<Toolbar />
				<Box
					sx={{
						width: {
							xs: '90vw',
							sm: '70vw',
							md: '50vw',
							lg: '40vw',
							xl: '30vw',
						},
						height: 'auto',
						m: 'auto',
					}}>
					<Typography variant='h4'>Iniciar sesión</Typography>
					<form>
						<Card
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
								my: 4,
								p: 4,
							}}>
							<TextField
								label='Correo electrónico'
								variant='filled'
								type='email'
							/>
							<TextField
								label='Contraseña'
								variant='filled'
								type='password'
							/>
							<Button variant='contained'>Ingresar</Button>
							<Box>
								<Button
									variant='text'
									onClick={() =>
										navigate('/recovery', {
											state: {
												email: 'email',
											},
										})
									}>
									Recuperar contraseña
								</Button>
							</Box>
						</Card>
					</form>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
						}}>
						<Typography>¿No tienes una cuenta?</Typography>
						<Button
							variant='text'
							onClick={() =>
								navigate('/logup', { replace: true })
							}>
							Regístrate
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Login;

import { useNavigate } from 'react-router-dom';
import { ToolbarWithoutSesion } from '../components/Toolbar';
import {
	Box,
	Button,
	Card,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';

const Recovery = () => {
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
						mx: 'auto',
					}}>
					<Typography variant='h4'>Recuperar contraseña</Typography>
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
							<Button type='submit' variant='contained'>
								Recuperar
							</Button>
						</Card>
					</form>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}>
						<Typography>Iniciar sesión</Typography>
						<Button
							variant='text'
							onClick={() =>
								navigate('/login', { replace: true })
							}>
							Iniciar sesión
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Recovery;

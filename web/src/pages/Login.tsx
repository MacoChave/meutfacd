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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

type FormData = {
	correo: string;
	pass: string;
};

const Login = () => {
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		if (data.correo.includes('estudiante'))
			navigate('/estudiante', { replace: true });
		else if (data.correo.includes('encargado'))
			navigate('/encargado', { replace: true });
		else if (data.correo.includes('profesor'))
			navigate('/evaluador', { replace: true });
		else if (data.correo.includes('admin'))
			navigate('/admin', { replace: true });
		else navigate('/analiticas', { replace: true });
	};

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
					<Typography variant='h4'>Iniciar sesión</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Card
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
								my: 4,
								p: 4,
							}}>
							<Controller
								control={control}
								name='correo'
								render={({ field }) => (
									<TextField
										{...field}
										label='Correo electrónico'
										variant='filled'
										type='email'
									/>
								)}
							/>
							<Controller
								control={control}
								name='pass'
								render={({ field }) => (
									<TextField
										{...field}
										label='Contraseña'
										variant='filled'
										type='password'
									/>
								)}
							/>
							<Button type='submit' variant='contained'>
								Ingresar
							</Button>
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
							alignItems: 'center',
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

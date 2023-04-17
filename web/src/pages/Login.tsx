import {
	Box,
	Button,
	Card,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { ToolbarWithoutSesion } from '../components/Toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoginType, schemaLoginType } from '../propTypes/Login';
import { useAuthStore } from '../hooks/useAuthStore';
import { postData } from '../services/fetching';
import { URL } from '../api/server';
import { AuthState } from '../interfaces/AuthState';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError, AxiosResponse } from 'axios';
import { errorHandler } from '../helpers/errorHandler';
import { useState } from 'react';
import Loader from '../components/Loader';

const Login = () => {
	const navigate = useNavigate();
	const { setEstado } = useAuthStore();
	const { tipo } = useParams();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		defaultValues: {
			correo: '',
			pass: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schemaLoginType),
	});

	const onSubmit: SubmitHandler<LoginType> = async (body) => {
		try {
			setLoading(true);
			if (tipo === '1') {
				// Estudiante - /login/estudiante
				const response = await postData<AuthState>({
					path: URL.AUTH.LOGIN_ESTUDIANTE,
					body,
				});
				setEstado(response);
			} else {
				// Profesor - /login/profesor
				const response = await postData<AuthState>({
					path: URL.AUTH.LOGIN_PROFESOR,
					body,
				});
				setEstado(response);
			}
		} catch (error: any) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
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
										error={!!errors.correo}
										helperText={
											errors.correo?.message || ''
										}
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
										error={!!errors.pass}
										helperText={errors.pass?.message || ''}
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
			{loading && <Loader />}
		</>
	);
};

export default Login;

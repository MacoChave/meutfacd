import { URL } from '@/api/server';
import Loader from '@/components/Loader';
import { ToolbarWithoutSesion } from '@/components/navegacion/Toolbar';
import { useAuthStore } from '@/hooks/useAuthStore';
import { AuthState } from '@/interfaces/AuthState';
import { Tipo_Login, schemaLogin } from '@/models/Login';
import { postData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Card,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import {
	Controller,
	FormProvider,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Seguridad } from './Seguridad';

export type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const navigate = useNavigate();
	const { setEstado } = useAuthStore();
	const { tipo } = useParams();
	const [loading, setLoading] = useState(false);

	const methods = useForm<Tipo_Login>({
		defaultValues: {
			correo: '',
			pass: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schemaLogin),
	});

	const onSubmit: SubmitHandler<Tipo_Login> = async (body) => {
		try {
			setLoading(true);
			const path =
				tipo === '1'
					? URL.AUTH.LOGIN_ESTUDIANTE
					: URL.AUTH.LOGIN_PROFESOR;
			const response = await postData<AuthState>({
				path,
				body,
			});
			setEstado(response);
			navigate(`/${response.usuario.rol?.toString() || 'estudiante'}`, {
				replace: true,
				state: {},
			});
		} catch (error: any) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
	};

	const handleRecuperar = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/recovery', {
			replace: true,
			state: { email: 'email' },
		});
	};

	const handleLogup = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/logup', {
			replace: true,
			state: {},
		});
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
							sm: '80vw',
							md: '70vw',
							lg: '60vw',
						},
						mx: 'auto',
						height: '100%',
					}}>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									p: 4,
									gap: 4,
								}}>
								<Typography variant='h4'>
									Iniciar sesión
								</Typography>
								<Typography variant='body1' color='GrayText'>
									¿No tienes cuenta?{' '}
									<Button
										variant='text'
										onClick={handleLogup}>
										Registrate
									</Button>
								</Typography>
								<Seguridad />
								<Button variant='contained' type='submit'>
									Ingresar
								</Button>
								<Box>
									<Button
										variant='text'
										onClick={handleRecuperar}>
										Recuperar contraseña
									</Button>
								</Box>
							</Card>
						</form>
					</FormProvider>
				</Box>
			</Box>
			{loading && <Loader />}
		</>
	);
};

export default Login;

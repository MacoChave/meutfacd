import { URL } from '@/api/server';
import Loader from '@/components/Loader';
import { ToolbarWithoutSesion } from '@/components/navegacion/Toolbar';
import { AuthState } from '@/interfaces/AuthState';
import { Tipo_Login, schemaLogin } from '@/models/Login';
import store from '@/redux/store';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Toolbar, Typography } from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Seguridad } from './Seguridad';
import { useDispatch } from 'react-redux';
import { setLogged } from '@/redux/states';

export type LoginProps = Record<string, never>;

const Login: React.FC<LoginProps> = () => {
	const navigate = useNavigate();
	const control = store.getState().control;
	const dispatch = useDispatch();
	const { rol } = useParams();

	const methods = useForm<Tipo_Login>({
		defaultValues: {
			correo: '',
			pass: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schemaLogin),
	});

	const onSubmit: SubmitHandler<Tipo_Login> = async (body) => {
		const response = await postData<AuthState>({
			path: URL.AUTH.LOGIN,
			body,
		});
		console.table(response);

		if (response.token === undefined) return;

		dispatch(setLogged(response));
		navigate(`/${response.rol.toString().toLowerCase() || 'estudiante'}`, {
			replace: true,
			state: {},
		});
	};

	const handleRecuperar = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/recuperar', {
			replace: true,
			state: { email: 'email' },
		});
	};

	const handleLogup = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/logup/' + rol, {
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
			{control.loading && <Loader />}
		</>
	);
};

export default Login;

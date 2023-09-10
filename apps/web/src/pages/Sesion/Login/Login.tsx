import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Toolbar, Typography } from '@mui/material';
import React, { SyntheticEvent, lazy } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '@/api/server';
const SpinLoader = lazy(
	() => import('@/components/Loader/SpinLoader/SpinLoader')
);
import { ToolbarWithoutSesion } from '@/components/navegacion/Toolbar';
import { AuthState } from '@/interfaces/AuthState';
import { Tipo_Login, schemaLogin } from '@/models/Login';
import { setLogged } from '@/redux/states';
import store from '@/redux/store';
import { postData } from '@/services/fetching';
import { Seguridad } from './Seguridad';

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

		const rol = response.roles ? response.roles.split(' ')[0] : '';

		dispatch(setLogged(response));
		navigate(`/${rol || 'estudiante'}`.toLowerCase(), {
			replace: true,
			state: {},
		});
	};

	const handleRecovery = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate(`/recovery/${rol}`, {
			replace: true,
			state: { email: methods.getValues('correo') },
		});
	};

	const handleLogup = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate(`/logup/${rol}`, {
			replace: true,
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
										onClick={handleRecovery}>
										Recuperar contraseña
									</Button>
								</Box>
							</Card>
						</form>
					</FormProvider>
				</Box>
			</Box>
			{control.loading && <SpinLoader />}
		</>
	);
};

export default Login;

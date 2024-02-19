import { URL } from '@/consts/Api';
import { TAuthState } from '@/models/Control';
import { TLogin, schemaLogin } from '@/models/Login';
import { setLogged } from '@/redux/states';
import store from '@/redux/store';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Toolbar, Typography } from '@mui/material';
import React, { SyntheticEvent, lazy } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
const Footer = lazy(() => import('@/components/Layout/Footer/Footer'));
const Seguridad = lazy(
	() => import('@/pages/Sesion/Login/Seguridad/Seguridad')
);
const SpinLoader = lazy(
	() => import('@/components/Loader/SpinLoader/SpinLoader')
);
const ToolbarWithoutSesion = lazy(
	() =>
		import(
			'@/components/Layout/ToolbarWithoutSession/ToolbarWithoutSession'
		)
);

export type LoginProps = Record<string, never>;

const Login: React.FC<LoginProps> = () => {
	const navigate = useNavigate();
	const control = store.getState().control;
	const dispatch = useDispatch();
	const { rol } = useParams();

	const methods = useForm<TLogin>({
		defaultValues: {
			correo: '',
			pass: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(schemaLogin),
	});

	const onSubmit: SubmitHandler<TLogin> = async (body) => {
		const response = await postData<TAuthState>({
			path: URL.AUTH.LOGIN,
			body,
		});
		console.table(response);

		if (response.token === undefined) return;

		const rol = response.roles ? response.roles.split(' ')[0] : '';

		dispatch(setLogged(response));
		navigate(`/administrador`.toLowerCase(), {
			replace: true,
			state: {},
		});
	};

	const handleRecovery = async (e: SyntheticEvent) => {
		e.preventDefault();
		const response = await postData<any>({
			path: URL.AUTH.RECOVERY,
			body: { correo: methods.getValues('correo') },
		});
		if (response?.msg) {
			swal({
				title: '¡Bien hecho!',
				text: 'Revisa tu correo electrónico para recuperar tu contraseña',
				icon: 'success',
			});
		}
	};

	const handleLogup = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate(`/logup/${rol}`, {
			replace: true,
		});
	};

	return (
		<>
			<Box
				component={'main'}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					height: '96vh',
					justifyContent: 'space-between',
					overflow: 'hidden',
				}}>
				<ToolbarWithoutSesion />
				<Box sx={{ overflowY: 'scroll' }}>
					<Toolbar />
					<FormProvider {...methods}>
						<Box
							component={'form'}
							onSubmit={methods.handleSubmit(onSubmit)}>
							<Card
								sx={{
									p: 2,
									mx: 'auto',
									display: 'flex',
									flexDirection: 'column',
									width: { xs: '90%', md: '50%', lg: '30%' },
									gap: 3,
								}}>
								<Typography variant='h4' component={'h2'}>
									Iniciar sesión
								</Typography>
								<Typography variant='body1' color='GrayText'>
									¿No tienes cuenta?
									<Button
										variant='text'
										type='button'
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
										type='button'
										onClick={handleRecovery}>
										Recuperar contraseña
									</Button>
								</Box>
							</Card>
						</Box>
					</FormProvider>
				</Box>
				<Box flex={1} />
				<Footer />
			</Box>
			{control.loading && <SpinLoader />}
		</>
	);
};

export default Login;

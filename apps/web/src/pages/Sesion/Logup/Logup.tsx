import { URL } from '@/consts/Api';
import { TLogup, logupDefault, schemaLogup } from '@/models/Logup';
import { postData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Toolbar, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import React, { SyntheticEvent, lazy, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
const Footer = lazy(() => import('@/components/Layout/Footer/Footer'));
const SpinLoader = lazy(
	() => import('@/components/Loader/SpinLoader/SpinLoader')
);
const ToolbarWithoutSesion = lazy(
	() =>
		import(
			'@/components/Layout/ToolbarWithoutSession/ToolbarWithoutSession'
		)
);
const Contacto = lazy(() => import('@/pages/Sesion/Logup/Contacto/Contacto'));
const Personales = lazy(
	() => import('@/pages/Sesion/Logup/Personales/Personales')
);
const Seguridad = lazy(
	() => import('@/pages/Sesion/Logup/Seguridad/Seguridad')
);

export type LogupProps = {};

const Logup: React.FC<LogupProps> = () => {
	const [enviando, setEnviando] = useState(false);
	const { rol } = useParams();
	const methods = useForm<TLogup>({
		defaultValues: logupDefault,
		resolver: yupResolver(schemaLogup),
		mode: 'onBlur',
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<TLogup> = async (data) => {
		try {
			setEnviando(true);
			const response = await postData({
				path: URL.AUTH.LOGUP,
				body: data,
				params: { rol: rol },
			});

			swal(
				'¡Cuenta creada!',
				'Verifica tu correo electrónico para activar tu cuenta',
				'success'
			);
			methods.reset();
		} catch (error: any) {
			errorHandler(error as AxiosError);
		} finally {
			setEnviando(false);
		}
	};

	const handleLogin = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/login/' + rol, {
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
									p: 2,
									gap: 2,
								}}>
								<Typography variant='h4'>Registro</Typography>
								<Typography variant='body1' color='GrayText'>
									¿Ya tienes una cuenta?{' '}
									<Button
										variant='text'
										color='primary'
										onClick={handleLogin}>
										Inicia sesión
									</Button>
								</Typography>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
									}}>
									<Typography sx={{ flex: 1 }}>
										Personal
									</Typography>
									<Personales />
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
									}}>
									<Typography sx={{ flex: 1 }}>
										Contacto
									</Typography>
									<Contacto />
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
									}}>
									<Typography sx={{ flex: 1 }}>
										Seguridad
									</Typography>
									<Seguridad />
								</Box>
								<Button
									fullWidth
									type='submit'
									variant='contained'
									color='primary'
									disabled={!methods.formState.isValid}>
									Crear cuenta
								</Button>
							</Card>
						</form>
					</FormProvider>
				</Box>
				<Footer />
			</Box>
			{enviando && <SpinLoader />}
		</>
	);
};

export default Logup;

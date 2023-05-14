import { ToolbarWithoutSesion } from '@/components/navegacion/Toolbar';
import { Tipo_Logup, initialValuesLogup, schemaLogup } from '@/models/Logup';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Divider, Toolbar, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Contacto } from './Contacto';
import { Personales } from './Personales';
import { Seguridad } from './Seguridad';
import { postData } from '@/services/fetching';
import { URL } from '@/api/server';
import Loader from '@/components/Loader';

export type LogupProps = {};

const Logup: React.FC<LogupProps> = () => {
	const [enviando, setEnviando] = useState(false);
	const methods = useForm<Tipo_Logup>({
		defaultValues: initialValuesLogup,
		resolver: yupResolver(schemaLogup),
		mode: 'onBlur',
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Tipo_Logup> = async (data) => {
		try {
			setEnviando(true);
			const response = await postData({
				path: URL.AUTH.LOGUP_ESTUDIANTE,
				body: data,
			});
			console.log('Logup response', response);
			alert('Cuenta creada con éxito');
			methods.reset();
		} catch (error) {
			errorHandler(error as AxiosError);
			alert('Error al crear la cuenta');
		} finally {
			setEnviando(false);
		}
	};

	const handleLogin = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/login/1');
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
			</Box>
			{enviando && <Loader />}
		</>
	);
};

export default Logup;

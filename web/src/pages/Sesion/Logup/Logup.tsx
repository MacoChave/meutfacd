import { URL } from '@/api/server';
import { ToolbarWithoutSesion } from '@/components/navegacion/Toolbar';
import { Tipo_Logup, initialValuesLogup, schemaLogup } from '@/models/Logup';
import { postData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	IconButton,
	Step,
	StepLabel,
	Stepper,
	Toolbar,
	Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import React, { PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Contacto } from './Contacto';
import { Personales } from './Personales';
import { Seguridad } from './Seguridad';

export type LogupProps = {};

const steps = [
	'Datos personales',
	'Datos para contacto',
	'Datos para inicio de sesión',
];

export const StepperContenedor = ({ children }: PropsWithChildren) => {
	return (
		<Card>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 4,
					p: 3,
				}}>
				{children}
			</Box>
		</Card>
	);
};

const Logup: React.FC<LogupProps> = () => {
	const [pasoActivo, setPasoActivo] = useState(0);
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
			console.log('> Enviando datos:', data);
			const response = await postData({
				path: URL.AUTH.LOGIN_ESTUDIANTE,
				body: data,
			});
		} catch (error) {
			errorHandler(error as AxiosError);
		} finally {
			setEnviando(false);
		}
	};

	const handleNext = () => setPasoActivo(pasoActivo + 1);

	const handleBack = () => setPasoActivo(pasoActivo - 1);

	const handleReset = () => setPasoActivo(0);

	const RenderizarControl = () => {
		if (pasoActivo === 0) return <Personales />;
		if (pasoActivo === 1) return <Contacto />;
		if (pasoActivo === 2) return <Seguridad />;
		return (
			<Box>
				<Typography>Paso desconocido</Typography>
			</Box>
		);
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
						mx: 'auto',
					}}>
					<Typography variant='h4'>Crear una cuenta</Typography>
					<Stepper sx={{ my: 4 }} activeStep={pasoActivo}>
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{pasoActivo === steps.length ? (
						<StepperContenedor>
							<Typography>
								¡Tu cuenta ha sido creada con éxito!
							</Typography>
							<Button
								variant='contained'
								onClick={() =>
									console.log('Navegar a la página inicio')
								}>
								Regresar
							</Button>
						</StepperContenedor>
					) : (
						<StepperContenedor>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<RenderizarControl />
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-around',
										flexDirection: 'row',
										gap: 16,
										p: 3,
									}}>
									<IconButton
										sx={{ mt: 1, mr: 1 }}
										type='button'
										disabled={pasoActivo === 0}
										onClick={handleBack}>
										<ChevronLeft />
									</IconButton>
									{pasoActivo === steps.length - 1 ? (
										<Button
											sx={{ mt: 1, mr: 1 }}
											type='submit'
											variant='contained'
											onClick={handleNext}>
											Finalizar
										</Button>
									) : (
										<IconButton
											sx={{ mt: 1, mr: 1 }}
											type='button'
											disabled={pasoActivo === 0}
											onClick={handleNext}>
											<ChevronRight />
										</IconButton>
									)}
								</Box>
							</form>
						</StepperContenedor>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Logup;

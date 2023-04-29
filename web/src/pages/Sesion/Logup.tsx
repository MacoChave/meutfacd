import { URL } from '@/api/server';
import { postData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToolbarWithoutSesion } from '../../components/navegacion/Toolbar';
import {
	Tipo_Logup,
	initialValuesLogup,
	schemaLogup,
} from '../../models/Logup';

const steps = [
	'Datos personales',
	'Datos para contacto',
	'Datos para inicio de sesión',
];

const Logup = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [sending, setSending] = useState(false);
	const methods = useForm<Tipo_Logup>({
		defaultValues: initialValuesLogup,
		resolver: yupResolver(schemaLogup),
		mode: 'onBlur',
	});
	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = methods;

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Tipo_Logup> = async (body) => {
		try {
			setSending(true);
			console.log('> Sending data', body);
			const response = await postData({
				path: URL.AUTH.LOGIN_ESTUDIANTE,
				body,
			});
			console.log('> Logup Response', response);
		} catch (error) {
			errorHandler(error as AxiosError);
		} finally {
			setSending(false);
		}
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const getStepContent = (activeStep: number) => {
		switch (activeStep) {
			case 0:
				return (
					<>
						<Controller
							name='nombre'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Nombres'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.nombre}
									helperText={errors.nombre?.message}
								/>
							)}
						/>
						<Controller
							name='apellido'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Apellidos'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.apellido}
									helperText={errors.apellido?.message}
								/>
							)}
						/>
						<Controller
							name='genero'
							control={control}
							render={({ field }) => (
								<FormControl
									sx={{
										width: { xs: '200px', sm: '300px' },
									}}>
									<InputLabel>Género</InputLabel>
									<Select
										value={getValues('genero')}
										label='Género'
										onChange={(_e) => {
											setValue('genero', _e.target.value);
										}}>
										<MenuItem value='M'>Masculino</MenuItem>
										<MenuItem value='F'>Femenino</MenuItem>
									</Select>
								</FormControl>
							)}
						/>
						<Controller
							name='fecha_nac'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Fecha de nacimiento'
									variant='outlined'
									type='date'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.fecha_nac}
									helperText={errors.fecha_nac?.message}
								/>
							)}
						/>
					</>
				);
			case 1:
				return (
					<>
						<Controller
							control={control}
							name='carnet'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Registro estudiantil (Carné)'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.carnet}
									helperText={errors.carnet?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name='cui'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Código único de identificación (CUI)'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.cui}
									helperText={errors.cui?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name='direccion'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Dirección de residencia'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.direccion}
									helperText={errors.direccion?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name='telefono'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Teléfono'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.telefono}
									helperText={errors.telefono?.message}
								/>
							)}
						/>
					</>
				);
			case 2:
				return (
					<>
						<Controller
							control={control}
							name='correo'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Correo electrónico'
									variant='outlined'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.correo}
									helperText={errors.correo?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name='pass'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Contraseña'
									variant='outlined'
									type='password'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.pass}
									helperText={errors.pass?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name='confpass'
							render={({ field }) => (
								<TextField
									{...field}
									required
									label='Confirmar contraseña'
									variant='outlined'
									type='password'
									sx={{
										width: { xs: '200px', sm: '300px' },
										my: 2,
									}}
									error={!!errors.confpass}
									helperText={errors.confpass?.message}
								/>
							)}
						/>
					</>
				);
			default:
				return 'Unknown step';
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
						mx: 'auto',
					}}>
					<Typography variant='h4'>Crear una cuenta</Typography>
					<Stepper sx={{ my: 4 }} activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							const labelProps: {
								optional?: React.ReactNode;
							} = {};
							return (
								<Step key={label} {...stepProps}>
									<StepLabel {...labelProps}>
										{label}
									</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					{activeStep === steps.length ? (
						<Card sx={{ my: 4 }}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-around',
									alignItems: 'center',
									flexDirection: 'column',
									gap: 4,
									p: 3,
								}}>
								<Typography>
									¡Tu cuenta ha sido creada con éxito!
								</Typography>
								<Button
									variant='contained'
									onClick={handleReset}>
									Regresar
								</Button>
							</Box>
						</Card>
					) : (
						<form onSubmit={handleSubmit(onSubmit)}>
							<Card sx={{ my: 4 }}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-around',
										alignItems: 'center',
										flexDirection: 'column',
										p: 3,
									}}>
									{getStepContent(activeStep)}
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-around',
											flexDirection: 'row',
											gap: 16,
											p: 3,
										}}>
										<IconButton
											type='button'
											disabled={activeStep === 0}
											onClick={handleBack}
											sx={{ mt: 1, mr: 1 }}>
											<ChevronLeft />
										</IconButton>
										{activeStep === steps.length - 1 ? (
											<Button
												type='submit'
												variant='contained'
												sx={{ mt: 1, mr: 1 }}
												onClick={handleNext}>
												Finalizar
											</Button>
										) : (
											<IconButton
												type='button'
												onClick={handleNext}
												sx={{ mt: 1, mr: 1 }}>
												<ChevronRight />
											</IconButton>
										)}
									</Box>
								</Box>
							</Card>
						</form>
					)}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}>
						<Typography>¿Ya tienes una cuenta?</Typography>
						<Button
							variant='text'
							onClick={() =>
								navigate('/login', { replace: true })
							}>
							Inicia sesión
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Logup;

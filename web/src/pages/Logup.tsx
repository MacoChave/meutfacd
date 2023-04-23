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
import { ToolbarWithoutSesion } from '../components/Toolbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Tipo_Logup, schemaLogup } from '../propTypes/Logup';

const steps = [
	'Datos personales',
	'Datos para contacto',
	'Datos para inicio de sesión',
];

const Logup = () => {
	const [activeStep, setActiveStep] = useState(0);
	const {
		control,
		reset,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<Tipo_Logup>({
		resolver: yupResolver(schemaLogup),
		mode: 'onBlur',
	});

	const navigate = useNavigate();

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
									variant='filled'
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
									variant='filled'
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
									variant='filled'
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
						<TextField
							required
							label='Registro estudiantil (Carné)'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
						/>
						<TextField
							required
							label='Código único de identificación (CUI)'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
						/>
						<TextField
							required
							label='Dirección de residencia'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
						/>
						<TextField
							required
							label='Teléfono'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
						/>
					</>
				);
			case 2:
				return (
					<>
						<TextField
							required
							label='Correo electrónico'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
						/>
						<TextField
							required
							label='Contraseña'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
						/>
						<TextField
							required
							label='Confirmar contraseña'
							variant='filled'
							sx={{ width: { xs: '200px', sm: '300px' }, my: 2 }}
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
						<form>
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
												onClick={handleNext}
												sx={{ mt: 1, mr: 1 }}>
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

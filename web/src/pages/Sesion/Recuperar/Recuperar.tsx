import { ToolbarWithoutSesion } from '@/components/navegacion/Toolbar';
import {
	Tipo_Recuperar,
	initialValuesRecuperar,
	schemaRecuperar,
} from '@/models/Recuperar';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Card,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type RecuperarProps = {};

const Recuperar: React.FC<RecuperarProps> = () => {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Tipo_Recuperar>({
		defaultValues: initialValuesRecuperar,
		mode: 'onBlur',
		resolver: yupResolver(schemaRecuperar),
	});

	const onSubmit: SubmitHandler<Tipo_Recuperar> = async (body) => {
		try {
			console.log(body);
		} catch (error: any) {
			console.log(error);
		} finally {
			console.log('finally');
		}
	};

	const handleLogin = (e: SyntheticEvent) => {
		e.preventDefault();
		navigate('/login', {
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
							sm: '70vw',
							md: '50vw',
							lg: '40vw',
							xl: '30vw',
						},
						height: 'auto',
						mx: 'auto',
					}}>
					<Typography variant='h4'>Recuperar contraseña</Typography>
					<form>
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
							<Button type='submit' variant='contained'>
								Recuperar
							</Button>
						</Card>
					</form>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}>
						<Typography>Iniciar sesión</Typography>
						<Button variant='text' onClick={handleLogin}>
							Iniciar sesión
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Recuperar;

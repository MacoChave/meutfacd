import { ToolbarWithoutSesion } from '@/components';
import {
	RecoveryType,
	initialValues,
	schemaRecovery,
} from '@/models/Recuperar';
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
import { AxiosError } from 'axios';
import React, { SyntheticEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export type UserRecoveryProps = Record<string, never>;

const UserRecovery: React.FC<UserRecoveryProps> = ({}) => {
	const navigate = useNavigate();
	const { rol } = useParams();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<RecoveryType>({
		defaultValues: initialValues,
		mode: 'onBlur',
		resolver: yupResolver(schemaRecovery),
	});

	const onSubmit: SubmitHandler<RecoveryType> = async (body) => {
		try {
			console.log('Send email to recover password', body);
		} catch (error) {
			errorHandler(error as AxiosError);
		}
	};

	const goToLogin = (event: SyntheticEvent) => {
		navigate(`/login/${rol}`, {
			replace: true,
		});
	};

	return (
		<>
			<ToolbarWithoutSesion />
			<Box component={'main'} sx={{ p: 3 }}>
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
					<form onSubmit={handleSubmit(onSubmit)}>
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
						<Button variant='text' onClick={goToLogin}>
							Iniciar sesión
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default UserRecovery;

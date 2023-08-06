import { Tipo_Login } from '@/models/Login';
import { Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type SeguridadProps = {};

const Seguridad: React.FC<SeguridadProps> = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tipo_Login>();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				placeContent: 'center',
				gap: 2,
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
						helperText={errors.correo?.message || ''}
					/>
				)}
			/>
			<Controller
				control={control}
				name='pass'
				render={({ field }) => (
					<TextField
						{...field}
						label='Contraseña'
						variant='filled'
						type='password'
						error={!!errors.pass}
						helperText={errors.pass?.message || ''}
					/>
				)}
			/>
		</Box>
	);
};

export default Seguridad;
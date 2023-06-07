import { Tipo_Logup } from '@/models/Logup';
import { Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type SeguridadProps = {};

const Seguridad: React.FC<SeguridadProps> = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tipo_Logup>();

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
						sx={{ width: { xs: '200px', sm: '300px' } }}
						label='Correo electrónico'
						variant='outlined'
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
						sx={{ width: { xs: '200px', sm: '300px' } }}
						label='Contraseña'
						variant='outlined'
						type='password'
						error={!!errors.pass}
						helperText={errors.pass?.message || ''}
					/>
				)}
			/>
			<Controller
				control={control}
				name='confpass'
				render={({ field }) => (
					<TextField
						{...field}
						sx={{ width: { xs: '200px', sm: '300px' } }}
						label='Confirmar contraseña'
						variant='outlined'
						type='password'
						error={!!errors.confpass}
						helperText={errors.confpass?.message || ''}
					/>
				)}
			/>
		</Box>
	);
};

export default Seguridad;

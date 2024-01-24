import { McInput } from '@/components';
import { TLogin } from '@/models/Login';
import { Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type SeguridadProps = {};

const Seguridad: React.FC<SeguridadProps> = () => {
	const { control } = useFormContext<TLogin>();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				placeContent: 'center',
				gap: 2,
			}}>
			<McInput
				control={control as any}
				name='correo'
				label='Correo electrónico'
				type='email'
			/>
			<McInput
				control={control as any}
				name='pass'
				label='Contraseña'
				type='password'
			/>
		</Box>
	);
};

export default Seguridad;

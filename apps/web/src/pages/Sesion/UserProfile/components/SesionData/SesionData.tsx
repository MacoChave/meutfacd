import React from 'react';
import { DataProps } from '../../propTypes/DataProps';
import { Controller, useFormContext } from 'react-hook-form';
import { UserType } from '@/models/Perfil';
import { Box, TextField } from '@mui/material';

const SesionData: React.FC<DataProps> = ({ editing }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<UserType>();
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			}}>
			<Controller
				control={control}
				name='correo'
				render={({ field }) => (
					<TextField
						{...field}
						label='Correo electrónico'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
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
						type='password'
						label='Contraseña nueva'
						variant='standard'
						InputProps={{
							autoComplete: 'new-password',
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.pass}
						helperText={errors.pass?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='passConfirm'
				render={({ field }) => (
					<TextField
						{...field}
						type='password'
						label='Confirmar contraseña nueva'
						variant='standard'
						inputProps={{
							autoComplete: 'new-password',
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.passConfirm}
						helperText={errors.passConfirm?.message}
					/>
				)}
			/>
		</Box>
	);
};

export default SesionData;

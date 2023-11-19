import { Tipo_Logup } from '@/models/Logup';
import { VisibilityOff, Visibility} from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type SeguridadProps = {};

const Seguridad: React.FC<SeguridadProps> = () => {
	const [passType, setPassType] = useState('password')
	const [rePassType, setRePassType] = useState('password')
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
						type={passType}
						error={!!errors.pass}
						helperText={errors.pass?.message || ''}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setPassType((prev) => prev === 'password' ? 'text' : 'password')}
										onMouseDown={(event) => event.preventDefault()}
										edge='end'>
										{passType === 'password' ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
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
						type={rePassType}
						error={!!errors.confpass}
						helperText={errors.confpass?.message || ''}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setRePassType((prev) => prev === 'password' ? 'text' : 'password')}
										onMouseDown={(event) => event.preventDefault()}
										edge='end'>
										{rePassType === 'password' ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				)}
			/>
		</Box>
	);
};

export default Seguridad;

import { Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type ContactoProps = {};

const Contacto: React.FC<ContactoProps> = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

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
				name='carnet'
				render={({ field }) => (
					<TextField
						{...field}
						sx={{ width: { xs: '200px', sm: '300px' } }}
						label='Registro universitario'
						variant='outlined'
						error={!!errors.carnet}
					/>
				)}
			/>
			<Controller
				control={control}
				name='cui'
				render={({ field }) => (
					<TextField
						{...field}
						sx={{ width: { xs: '200px', sm: '300px' } }}
						label='Código único de identificación (CUI)'
						variant='outlined'
						error={!!errors.cui}
					/>
				)}
			/>
			<Controller
				control={control}
				name='direccion'
				render={({ field }) => (
					<TextField
						{...field}
						sx={{ width: { xs: '200px', sm: '300px' } }}
						label='Dirección de residencia'
						variant='outlined'
						error={!!errors.nombre}
					/>
				)}
			/>
		</Box>
	);
};

export default Contacto;

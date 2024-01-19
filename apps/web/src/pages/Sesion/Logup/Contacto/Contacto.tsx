import { McInput } from '@/components';
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
			<McInput
				control={control}
				name='carnet'
				label='Registro universitario'
				type='text'
			/>
			<McInput
				control={control}
				name='cui'
				label='Código único de identificación (CUI)'
				type='text'
			/>
			<McInput
				control={control}
				name='direccion'
				label='Dirección de residencia'
				type='text'
			/>
			{/* <Controller
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
			/> */}
			{/* <Controller
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
			/> */}
			{/* <Controller
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
			/> */}
		</Box>
	);
};

export default Contacto;

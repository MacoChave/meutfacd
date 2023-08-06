import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type PersonalesProps = {};

const generos = [
	{ value: 'M', label: 'Masculino' },
	{ value: 'F', label: 'Femenino' },
];

const Personales: React.FC<PersonalesProps> = () => {
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
				name='nombre'
				render={({ field }) => (
					<TextField
						{...field}
						label='Nombres'
						variant='outlined'
						sx={{ width: { xs: '200px', sm: '300px' } }}
						error={!!errors.nombre}
						helperText={errors.nombre?.message?.toString()}
					/>
				)}
			/>
			<Controller
				control={control}
				name='apellido'
				render={({ field }) => (
					<TextField
						{...field}
						label='Apellido'
						variant='outlined'
						sx={{ width: { xs: '200px', sm: '300px' } }}
						error={!!errors.apellido}
						helperText={errors.apellido?.message?.toString()}
					/>
				)}
			/>
			<Controller
				control={control}
				name='genero'
				render={({ field }) => (
					<Autocomplete
						{...field}
						value={
							field.value
								? generos.find((g) => g.value === field.value)
								: null
						}
						options={generos}
						autoHighlight
						getOptionLabel={(option) => option.label}
						onChange={(e, newValue) =>
							field.onChange(newValue?.value || '')
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Género'
								variant='outlined'
								sx={{
									width: { xs: '200px', sm: '300px' },
								}}
								error={!!errors.genero}
								helperText={errors.genero?.message?.toString()}
							/>
						)}
					/>
				)}
			/>
			<Controller
				control={control}
				name='fecha_nac'
				render={({ field }) => (
					<TextField
						{...field}
						label='Fecha de nacimiento'
						variant='outlined'
						type='date'
						sx={{ width: { xs: '200px', sm: '300px' } }}
						error={!!errors.fecha_nac}
						helperText={errors.fecha_nac?.message?.toString()}
					/>
				)}
			/>
		</Box>
	);
};

export default Personales;
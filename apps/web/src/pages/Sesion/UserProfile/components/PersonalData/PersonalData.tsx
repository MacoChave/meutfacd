import React from 'react';
import { DataProps } from '../../propTypes/DataProps';
import { Controller, useFormContext } from 'react-hook-form';
import { UserType } from '@/models/Perfil';
import { Box, TextField } from '@mui/material';
import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';
import { generos } from '@/consts/genres';

const PersonalData: React.FC<DataProps> = ({ editing }) => {
	const {
		control,
		setValue,
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
				name='nombre'
				render={({ field }) => (
					<TextField
						{...field}
						label='Nombres'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.nombre}
						helperText={errors.nombre?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='apellidos'
				render={({ field }) => (
					<TextField
						{...field}
						label='Apellidos'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.apellidos}
						helperText={errors.apellidos?.message}
					/>
				)}
			/>
			<McAutocomplete
				control={control as any}
				name='genero'
				label='Género'
				options={generos.map((g) => ({ id: g.value, label: g.label }))}
				disabled={!editing}
			/>
			<Controller
				control={control}
				name='fecha_nac'
				render={({ field }) => (
					<TextField
						{...field}
						type='date'
						label='Fecha de nacimiento'
						variant='standard'
						onChange={(e) => {
							setValue('fecha_nac', e.target.value);
							field.onChange(e);
						}}
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.fecha_nac}
						helperText={errors.fecha_nac?.message}
					/>
				)}
			/>
		</Box>
	);
};

export default PersonalData;

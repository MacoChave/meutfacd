import React from 'react';
import { DataProps } from '../../propTypes/DataProps';
import { Controller, useFormContext } from 'react-hook-form';
import { UserType } from '@/models/Perfil';
import { Box, TextField } from '@mui/material';
import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';

export const ContactData: React.FC<DataProps> = ({ editing }) => {
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
				name='telefono'
				render={({ field }) => (
					<TextField
						{...field}
						label='Teléfono'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.telefono}
						helperText={errors.telefono?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='carnet'
				render={({ field }) => (
					<TextField
						{...field}
						label='Registro universitario'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.carnet}
						helperText={errors.carnet?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='cui'
				render={({ field }) => (
					<TextField
						{...field}
						label='Código único de identificación'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.cui}
						helperText={errors.cui?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='direccion'
				render={({ field }) => (
					<TextField
						{...field}
						label='Dirección'
						variant='standard'
						InputProps={{
							readOnly: !editing,
							disabled: !editing,
						}}
						error={!!errors.direccion}
						helperText={errors.direccion?.message}
					/>
				)}
			/>
			<McAutocomplete
				control={control as FormValues}
				name='id_jornada'
				label='Jornada'
				options={[]}
			/>
		</Box>
	);
};

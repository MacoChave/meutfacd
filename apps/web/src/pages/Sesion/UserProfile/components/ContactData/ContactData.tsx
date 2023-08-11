import { UserType } from '@/models/Perfil';
import { Box, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DataProps } from '../../propTypes/DataProps';
import { useCustomFetch } from '@/hooks/useFetch';
import { URL } from '@/api/server';
import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';

const ContactData: React.FC<DataProps> = ({ editing }) => {
	const {
		control,
		formState: { errors },
		getValues,
		watch,
	} = useFormContext<UserType>();

	const {
		data: periods,
		isLoading: isLoadingPeriods,
		isError: isErrorPeriods,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_jornada',
		},
	});

	const {
		data: schedules,
		isLoading: isLoadingSchedules,
		isError: isErrorSchedules,
		refetch: refetchSchedules,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_horario',
		},
		params: { id_jornada: getValues('id_jornada') },
	});

	useEffect(() => {
		refetchSchedules();
	}, [watch('id_jornada')]);

	if (isLoadingPeriods || isLoadingSchedules) {
		return <div>Cargando...</div>;
	}

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
				control={control as any}
				name='id_jornada'
				options={periods.map((p: any) => ({
					id: p.id_jornada,
					label: p.nombre,
				}))}
				label='Jornada'
				disabled={!editing}
			/>
			<McAutocomplete
				control={control as any}
				name='id_horario'
				options={schedules.map((s: any) => ({
					id: s.id_horario,
					label: s.hora_inicio,
				}))}
				label='Horario'
				disabled={!editing}
			/>
		</Box>
	);
};

export default ContactData;

import { Contenedor } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
	Controller,
	FormProvider,
	SubmitHandler,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { URL } from '../../api/server';
import { useFetch } from '../../hooks/useFetch';
import {
	Tipo_Usuario,
	defaultProfile,
	schemaUsuario,
} from '../../models/Perfil';
import { ErrorPage } from '../ErrorPage';

type PerfilProps = {
	modoEdicion: boolean;
};

const Personales = ({ modoEdicion }: PerfilProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tipo_Usuario>();
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
						}}
						error={!!errors.apellidos}
						helperText={errors.apellidos?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='genero'
				render={({ field }) => (
					<TextField
						{...field}
						label='Género'
						variant='standard'
						InputProps={{
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
						}}
						error={!!errors.genero}
						helperText={errors.genero?.message}
					/>
				)}
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
						InputProps={{
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
						}}
						error={!!errors.fecha_nac}
						helperText={errors.fecha_nac?.message}
					/>
				)}
			/>
		</Box>
	);
};

const Contacto = ({ modoEdicion }: PerfilProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tipo_Usuario>();
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
						}}
						error={!!errors.direccion}
						helperText={errors.direccion?.message}
					/>
				)}
			/>
			{/* <Controller
									control={control}
									name='jornada'
									render={({field}) => (
										<TextField {...field} />
									)}
								/> */}
			{/* <Controller
									control={control}
									name='horario'
									render={({field}) => (
										<TextField {...field} />
									)}
								/> */}
		</Box>
	);
};

const Sesion = ({ modoEdicion }: PerfilProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<Tipo_Usuario>();
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
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
							readOnly: !modoEdicion,
							disabled: !modoEdicion,
						}}
						error={!!errors.passConfirm}
						helperText={errors.passConfirm?.message}
					/>
				)}
			/>
		</Box>
	);
};

export const Perfil = (): JSX.Element => {
	const [modoEdicion, setModoEdicion] = useState(false);
	const {
		data: perfil,
		error,
		isLoading,
		isPreviousData,
	} = useFetch({
		url: URL.AUTH.PROFILE,
	});
	const methods = useForm<Tipo_Usuario>({
		defaultValues: defaultProfile,
		mode: 'onBlur',
		resolver: yupResolver(schemaUsuario),
	});

	const handleModoEdicion = (event: SyntheticEvent) => {
		event.preventDefault();
		setModoEdicion(true);
	};

	const onSubmit: SubmitHandler<Tipo_Usuario> = async (data) => {
		console.log('> Form perfil', data);
		setModoEdicion(false);
	};

	useEffect(() => {
		if (perfil) {
			methods.setValue('id_usuario', perfil.id_usuario);
			methods.setValue('nombre', perfil.nombre);
			methods.setValue('apellidos', perfil.apellidos);
			methods.setValue('genero', perfil.genero);
			methods.setValue('correo', perfil.correo);
			methods.setValue('carnet', perfil.carnet);
			methods.setValue('cui', perfil.cui);
			methods.setValue('direccion', perfil.direccion);
			methods.setValue('fecha_nac', perfil.fecha_nac);
			methods.setValue('estado', perfil.estado);
			methods.setValue('telefono', perfil.telefono);
			methods.setValue('id_rol', perfil.id_rol);
			methods.setValue('rol', perfil.rol);
		}
	}, [isPreviousData]);

	if (isLoading) return <>Cargando datos...</>;

	if (error)
		return (
			<ErrorPage
				codigo={500}
				mensaje='No se pudo obtener los datos del perfil'
			/>
		);

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Contenedor title='Perfil de usuario'>
					<Box
						component='article'
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<Box
							component='section'
							sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
							<Box component='header' sx={{ flex: 1 }}>
								<Typography variant='h6'>
									Datos personales
								</Typography>
							</Box>
							<Personales modoEdicion={modoEdicion} />
						</Box>
						<Divider />
						<Box
							component='section'
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 4,
							}}>
							<Box component='header' sx={{ flex: 1 }}>
								<Typography variant='h6'>
									Datos de contacto
								</Typography>
							</Box>
							<Contacto modoEdicion={modoEdicion} />
						</Box>
						<Divider />
						<Box
							component='section'
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: 4,
							}}>
							<Box component='header' sx={{ flex: 1 }}>
								<Typography variant='h6'>
									Datos de sesión
								</Typography>
							</Box>
							<Sesion modoEdicion={modoEdicion} />
						</Box>
						<Divider />
						<Button
							variant='contained'
							color='primary'
							type='button'
							sx={{ display: modoEdicion ? 'none' : 'block' }}
							onClick={handleModoEdicion}>
							Editar
						</Button>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							sx={{ display: modoEdicion ? 'block' : 'none' }}>
							Guardar
						</Button>
					</Box>
				</Contenedor>
			</form>
		</FormProvider>
	);
};

export default Perfil;

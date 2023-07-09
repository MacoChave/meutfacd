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
import { style } from '@/themes/styles';

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
	const [isEditing, setIsEditing] = useState(false);
	const {
		data: perfil,
		isError,
		isLoading,
	} = useFetch({
		url: URL.AUTH.PROFILE,
	});
	const methods = useForm<Tipo_Usuario>({
		defaultValues: perfil,
		mode: 'onBlur',
		resolver: yupResolver(schemaUsuario),
	});

	const toggleEditing = (event: SyntheticEvent) => {
		event.preventDefault();
		setIsEditing(!isEditing);
	};

	const onSubmit: SubmitHandler<Tipo_Usuario> = async (data) => {
		console.log('> Form perfil', data);
		setIsEditing(false);
	};

	// useEffect(() => {
	// 	if (perfil) {
	// 		methods.setValue('id_usuario', perfil.id_usuario);
	// 		methods.setValue('nombre', perfil.nombre);
	// 		methods.setValue('apellidos', perfil.apellidos);
	// 		methods.setValue('genero', perfil.genero);
	// 		methods.setValue('correo', perfil.correo);
	// 		methods.setValue('carnet', perfil.carnet);
	// 		methods.setValue('cui', perfil.cui);
	// 		methods.setValue('direccion', perfil.direccion);
	// 		methods.setValue('fecha_nac', perfil.fecha_nac);
	// 		methods.setValue('estado', perfil.estado);
	// 		methods.setValue('telefono', perfil.telefono);
	// 		methods.setValue('id_rol', perfil.id_rol);
	// 		methods.setValue('rol', perfil.rol);
	// 	}
	// }, [isPreviousData]);

	if (isLoading) return <>Cargando datos...</>;

	if (isError)
		return (
			<ErrorPage
				codigo={500}
				mensaje='No se pudo obtener los datos del perfil'
			/>
		);

	return (
		<FormProvider {...methods}>
			<Contenedor title='Perfil de usuario'>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Box
						component='article'
						sx={{
							display: 'grid',
							gap: 4,
							gridTemplateColumns: {
								xs: '1fr',
								sm: '2fr 1fr',
							},
						}}>
						<Typography variant='h6'>Datos personales</Typography>
						<Personales modoEdicion={isEditing} />
						<Divider sx={{ gridColumn: '1 / span 2' }} />
						<Typography variant='h6'>Datos de contacto</Typography>
						<Contacto modoEdicion={isEditing} />
						<Divider sx={{ gridColumn: '1 / span 2' }} />
						<Typography variant='h6'>Datos de sesión</Typography>
						<Sesion modoEdicion={isEditing} />
						<Divider sx={{ gridColumn: '1 / span 2' }} />
						<Button
							variant={isEditing ? 'outlined' : 'contained'}
							color={isEditing ? 'secondary' : 'primary'}
							type='button'
							onClick={toggleEditing}>
							{isEditing ? 'Cancelar' : 'Editar'}
						</Button>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							sx={{ display: isEditing ? 'block' : 'none' }}>
							Guardar
						</Button>
					</Box>
				</form>
			</Contenedor>
		</FormProvider>
	);
};

export default Perfil;

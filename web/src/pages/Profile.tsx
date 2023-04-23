import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import Contenedor from '../components/Card';
import { useFetch } from '../hooks/useFetch';
import { URL } from '../api/server';
import { useAuthStore } from '../hooks/useAuthStore';
import {
	Controller,
	FormProvider,
	SubmitHandler,
	useForm,
	useFormContext,
} from 'react-hook-form';
import {
	Tipo_PerfilEstudiante,
	Tipo_PerfilTutor,
	Tipo_Usuario,
	schemaUsuario,
} from '../propTypes/Perfil';
import { yupResolver } from '@hookform/resolvers/yup';
import { SyntheticEvent, useEffect, useState } from 'react';

const Personales = () => {
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
						error={!!errors.nombre}
						helperText={errors.nombre?.message}
					/>
				)}
			/>
			<Controller
				control={control}
				name='apellido'
				render={({ field }) => (
					<TextField
						{...field}
						label='Apellidos'
						variant='standard'
						error={!!errors.apellido}
						helperText={errors.apellido?.message}
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
						error={!!errors.fecha_nac}
						helperText={errors.fecha_nac?.message}
					/>
				)}
			/>
		</Box>
	);
};

const Contacto = () => {
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

const Sesion = () => {
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
						error={!!errors.passConfirm}
						helperText={errors.passConfirm?.message}
					/>
				)}
			/>
		</Box>
	);
};

const Profile = () => {
	const [modoEdicion, setModoEdicion] = useState(false);
	const { estado } = useAuthStore();
	const {
		data: perfil,
		error,
		isLoading,
		isPreviousData,
	} = useFetch({
		url: URL.AUTH.PROFILE,
		token: estado.token,
	});
	const methods = useForm<Tipo_Usuario>({
		defaultValues: {
			id_usuario: 0,
			nombre: '',
			apellido: '',
			genero: '',
			correo: '',
			pass: '',
			passConfirm: '',
			carnet: 0,
			cui: '',
			direccion: '',
			fecha_nac: new Date(),
			estado: '',
			telefono: '',
			perfil_tutor: {} as Tipo_PerfilTutor,
			perfil_estudiante: {} as Tipo_PerfilEstudiante,
		},
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
			methods.setValue('apellido', perfil.apellido);
			methods.setValue('genero', perfil.genero);
			methods.setValue('correo', perfil.correo);
			methods.setValue('carnet', perfil.carnet);
			methods.setValue('cui', perfil.cui);
			methods.setValue('direccion', perfil.direccion);
			methods.setValue('fecha_nac', perfil.fecha_nac);
			methods.setValue('estado', perfil.estado);
			methods.setValue('telefono', perfil.telefono);
			methods.setValue('perfil_tutor', perfil.perfil_tutor);
			methods.setValue('perfil_estudiante', perfil.perfil_estudiante);
		}
	}, [isPreviousData]);

	if (isLoading) return <>Cargando datos...</>;

	if (error) return <>Error al cargar los datos</>;

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
							<Personales />
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
							<Contacto />
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
							<Sesion />
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

export default Profile;

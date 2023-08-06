import { Contenedor, Loader } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { URL } from '../../../api/server';
import { useFetch } from '../../../hooks/useFetch';
import { UserType, schemaUsuario } from '../../../models/Perfil';
import { ErrorPage } from '../../ErrorPage';
import { ContactData } from './components/ContactData';
import { PersonalData } from './components/PersonalData';
import { SesionData } from './components/SesionData';

export const UserProfile = (): JSX.Element => {
	const [isEditing, setIsEditing] = useState(false);
	const {
		data: perfil,
		isError,
		isLoading,
	} = useFetch({
		url: URL.AUTH.PROFILE,
	});
	const methods = useForm<UserType>({
		defaultValues: perfil,
		mode: 'onBlur',
		resolver: yupResolver(schemaUsuario),
	});

	const toggleEditing = (event: SyntheticEvent) => {
		event.preventDefault();
		setIsEditing(!isEditing);
	};

	const onSubmit: SubmitHandler<UserType> = async (data) => {
		console.log('> Form perfil', data);
		setIsEditing(false);
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
	}, [isLoading]);

	if (isLoading) return <Loader />;

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
						<PersonalData editing={isEditing} />
						<Divider sx={{ gridColumn: '1 / span 2' }} />
						<Typography variant='h6'>Datos de contacto</Typography>
						<ContactData editing={isEditing} />
						<Divider sx={{ gridColumn: '1 / span 2' }} />
						<Typography variant='h6'>Datos de sesión</Typography>
						<SesionData editing={isEditing} />
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

export default UserProfile;

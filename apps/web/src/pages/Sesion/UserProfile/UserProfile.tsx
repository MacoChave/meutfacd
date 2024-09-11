import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { TResult } from '@/models/Fetching';
import { putData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { SyntheticEvent, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { URL } from '../../../consts/Api';
import { useFetch } from '../../../hooks/useFetch';
import { TUser, profileDefault, schemaUsuario } from '../../../models/Perfil';
import { ErrorPage } from '../../ErrorPage';
import { ContactData } from './components/ContactData';
import { PersonalData } from './components/PersonalData';
import { SesionData } from './components/SesionData';

export const UserProfile = (): JSX.Element => {
	const [isEditing, setIsEditing] = useState(false);
	const { data, isError, isLoading } = useFetch({
		url: URL.AUTH.PROFILE,
	});
	const methods = useForm<TUser>({
		defaultValues: profileDefault,
		mode: 'onBlur',
		resolver: yupResolver(schemaUsuario),
		values: {
			id_usuario: data?.message?.id_usuario ?? 0,
			nombre: data?.message?.nombre,
			apellidos: data?.message?.apellidos ?? '',
			genero: data?.message?.genero ?? '',
			correo: data?.message?.correo ?? '',
			carnet: data?.message?.carnet ?? '',
			cui: data?.message?.cui ?? '',
			direccion: data?.message?.direccion ?? '',
			fecha_nac: dayjs(data?.message?.fecha_nac, 'YYYY-MM-DD').format(
				'YYYY-MM-DD'
			),
			estado: data?.message?.estado ?? '',
			telefono: data?.message?.telefono ?? '',
			id_rol: 0,
			rol: '',
			id_jornada: data?.message?.perfil?.id_jornada ?? '',
			id_horario: data?.message?.perfil?.id_horario ?? '',
			pass: '',
			passConfirm: '',
			roles: '',
		},
	});

	const toggleEditing = (event: SyntheticEvent) => {
		event.preventDefault();
		setIsEditing(!isEditing);
	};

	const onSubmit: SubmitHandler<TUser> = async (data) => {
		const result: TResult[] = await putData({
			path: `${URL.USER}`,
			body: data,
		});
		if (result.some((item) => item.affectedRows === 0)) {
			swal(
				'¡Actualización fallida!',
				'Los datos del perfil no se actualizaron',
				'error'
			);
		} else {
			swal(
				'¡Actualización exitosa!',
				'Los datos del perfil se actualizaron correctamente',
				'success'
			);
			setIsEditing(false);
		}
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
	// 		methods.setValue(
	// 			'fecha_nac',
	// 			dayjs(perfil.fecha_nac).format('YYYY-MM-DD')
	// 		);
	// 		methods.setValue('estado', perfil.estado);
	// 		methods.setValue('telefono', perfil.telefono);
	// 		methods.setValue('id_rol', perfil.id_rol);
	// 		methods.setValue('rol', perfil.rol);
	// 		methods.setValue('id_jornada', perfil.id_jornada);
	// 		methods.setValue('id_horario', perfil.id_horario);
	// 	}
	// }, [isLoading]);

	if (isLoading) return <DotsLoaders />;

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
				<Box
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					component={'form'}
					onSubmit={methods.handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: 2,
							flexWrap: 'wrap',
						}}>
						<Typography sx={{ flex: 1 }} variant='h6'>
							Datos personales
						</Typography>
						<PersonalData
							sx={{
								minWidth: 300,
							}}
							editing={isEditing}
						/>
					</Box>
					{/* PERSONAL DATA */}
					<Divider sx={{ my: 2 }} />
					{/* CONTACT DATA */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: 2,
							flexWrap: 'wrap',
						}}>
						<Typography sx={{ flex: 1 }} variant='h6'>
							Datos de contacto
						</Typography>
						<ContactData
							sx={{ minWidth: 300 }}
							editing={isEditing}
						/>
					</Box>
					<Divider sx={{ my: 2 }} />
					{/* SESSION DATA */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: 2,
							flexWrap: 'wrap',
						}}>
						<Typography sx={{ flex: 1 }} variant='h6'>
							Datos de sesión
						</Typography>
						<SesionData
							sx={{ minWidth: 300 }}
							editing={isEditing}
						/>
						<Divider sx={{ my: 2 }} />
					</Box>
					{/* END FORM */}
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							justifyContent: 'center',
						}}>
						<Button
							fullWidth
							variant={isEditing ? 'outlined' : 'contained'}
							color={isEditing ? 'secondary' : 'primary'}
							type='button'
							onClick={toggleEditing}>
							{isEditing ? 'Cancelar' : 'Editar'}
						</Button>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							type='submit'
							sx={{ display: isEditing ? 'block' : 'none' }}>
							Guardar
						</Button>
					</Box>
				</Box>
			</Contenedor>
		</FormProvider>
	);
};

export default UserProfile;

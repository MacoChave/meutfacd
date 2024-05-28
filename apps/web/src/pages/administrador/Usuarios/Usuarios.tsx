import { Contenedor, DotsLoaders, McModal } from '@/components';
import { URL, URL_V2 } from '@/consts/Api';
import { useCustomFetch, useFetch, useInfiniteFetch } from '@/hooks/useFetch';
import { TUser } from '@/models/Perfil';
import { deleteData } from '@/services/fetching';
import { Box, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { lazy, useState } from 'react';
const McTable = lazy(() => import('@/components/MyTable/McTable'));
const ErrorOperacion = lazy(
	() => import('@/components/ErrorOperacion/ErrorOperacion')
);
const DetalleUsuario = lazy(() => import('./DetalleUsuario/DetalleUsuario'));

const Usuarios = () => {
	const [openModal, setOpenModal] = useState(false);
	const [usuario, setUsuario] = useState<TUser>({} as TUser);
	const { data, isLoading, error, refetch, fetchNextPage, hasNextPage } =
		useInfiniteFetch({
			name: 'users',
			url: `${URL_V2.USER}/all`,
			take: 10,
			skip: 0,
			q: '',
		});

	const onEdit = (registro: object) => {
		setUsuario(registro as TUser);
		setOpenModal(true);
	};

	const onDelete = async (registro: any) => {
		const response = await deleteData({
			path: `${URL.USER}`,
			params: { id_usuario: registro['id_usuario'] },
		});
		refetch();
	};

	const onClose = () => {
		setOpenModal(false);
		refetch();
	};

	if (isLoading) return <DotsLoaders />;
	if (error)
		return (
			<ErrorOperacion
				error={error}
				mensaje='No se pudo recuperar los usuarios'
			/>
		);

	return (
		<>
			<Contenedor title='Gestión de usuarios'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'left',
						alignItems: 'center',
						gap: 2,
						mb: 2,
					}}></Box>
				<McTable
					headers={{
						nombre: 'Nombre',
						apellidos: 'Apellidos',
						correo: 'Correo',
						carnet: 'Carnet',
					}}
					rows={
						data?.pages[0].message.data ?? []
						// data.data.map((d: TUser) => ({
						// 	...d,
						// 	roles: d.roles ? d.roles.split(' ')[0] : 'Sin rol',
						// })) || []
					}
					totalCols={{}}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			</Contenedor>
			{openModal && (
				<McModal
					title='Detalle del usuario'
					open={openModal}
					onClose={onClose}>
					<DetalleUsuario registro={usuario} />
				</McModal>
			)}
		</>
	);
};

export default Usuarios;

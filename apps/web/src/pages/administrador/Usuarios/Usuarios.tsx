import { Contenedor, McModal } from '@/components';
import { URL } from '@/consts/Api';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUser } from '@/models/Perfil';
import { deleteData } from '@/services/fetching';
import { lazy, useState } from 'react';
const McTable = lazy(() => import('@/components/MyTable/McTable'));
const ErrorOperacion = lazy(
	() => import('@/components/ErrorOperacion/ErrorOperacion')
);
const DetalleUsuario = lazy(() => import('./DetalleUsuario/DetalleUsuario'));

const Usuarios = () => {
	const [openModal, setOpenModal] = useState(false);
	const [usuario, setUsuario] = useState<TUser>({} as TUser);
	const { data, isSuccess, error, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: { table: 'ut_v_usuarios', sort: { id_usuario: 'asc' } },
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

	if (!isSuccess) return <div>Cargando usuarios...</div>;
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
				<McTable
					headers={{
						nombre: 'Nombre',
						correo: 'Correo',
						roles: 'Rol',
					}}
					rows={
						data.map((d: TUser) => ({
							...d,
							roles: d.roles ? d.roles.split(' ')[0] : 'Sin rol',
						})) || []
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

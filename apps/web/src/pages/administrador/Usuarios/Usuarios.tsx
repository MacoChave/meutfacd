import { URL } from '@/api/server';
import { Contenedor, McModal } from '@/components';
import { ErrorOperacion } from '@/components/ErrorOperacion';
import { MyTable } from '@/components/MyTable';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { UserType } from '@/models/Perfil';
import { useState } from 'react';
import { DetalleUsuario } from './DetalleUsuario';

const Usuarios = () => {
	const [openModal, setOpenModal] = useState(false);
	const [usuario, setUsuario] = useState<UserType>({} as UserType);
	const { data, isSuccess, error, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: { table: 'ut_v_usuarios', sort: { id_usuario: 'asc' } },
	});

	const onEdit = (registro: object) => {
		setUsuario(registro as UserType);
		setOpenModal(true);
	};

	const onDetail = (registro: object) => {
		setUsuario(registro as UserType);
		setOpenModal(true);
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
				<MyTable
					headers={{
						nombre: 'Nombre',
						correo: 'Correo',
						roles: 'Rol',
					}}
					rows={
						data.map((d: UserType) => ({
							...d,
							roles: d.roles.split(' ')[0],
						})) || []
					}
					totalCols={{}}
					onEdit={onEdit}
					onDelete={onDetail}
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

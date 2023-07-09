import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { ErrorOperacion } from '@/components/ErrorOperacion';
import { ModalGenerica } from '@/components/ModalGenerica';
import { MyTable } from '@/components/MyTable';
import { useFetch } from '@/hooks/useFetch';
import { Tipo_Usuario } from '@/models/Perfil';
import { useState } from 'react';
import { DetalleUsuario } from './DetalleUsuario';

const Usuarios = () => {
	const [openModal, setOpenModal] = useState(false);
	const [usuario, setUsuario] = useState<Tipo_Usuario>({} as Tipo_Usuario);
	const { data, isSuccess, error } = useFetch({
		url: `${URL.USUARIO}/all`,
		params: {},
	});

	const onEdit = (registro: object) => {
		setUsuario(registro as Tipo_Usuario);
		setOpenModal(true);
	};

	const onDetail = (registro: object) => {
		setUsuario(registro as Tipo_Usuario);
		setOpenModal(true);
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
						apellidos: 'Apellido',
						fecha_nac: 'Fecha de nacimiento',
						correo: 'Correo',
						carnet: 'Carnet',
					}}
					rows={data || []}
					totalCols={{}}
					onEdit={onEdit}
					onDelete={onDetail}
				/>
			</Contenedor>
			{openModal && (
				<ModalGenerica
					title='Detalle del usuario'
					open={openModal}
					setOpen={setOpenModal}>
					<DetalleUsuario registro={usuario} />
				</ModalGenerica>
			)}
		</>
	);
};

export default Usuarios;

import { URL } from '@/api/server';
import { ErrorOperacion } from '@/components/ErrorOperacion';
import { ModalGenerica } from '@/components/ModalGenerica';
import { TablaGenerica } from '@/components/TablaGenerica';
import Principal from '@/components/contenido/Principal';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';
import { DetalleUsuario } from './DetalleUsuario';
import { Tipo_Usuario } from '@/models/Perfil';

const Usuarios = () => {
	const [openModal, setOpenModal] = useState(false);
	const [usuario, setUsuario] = useState<Tipo_Usuario>({} as Tipo_Usuario);
	const { data, isSuccess, error } = useFetch({
		url: URL.USUARIO + '/all',
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
			<Principal
				titulo='Gestión de usuarios'
				handleAgregar={() => setOpenModal(true)}>
				<TablaGenerica
					registros={data}
					cabeceras={{
						nombre: 'Nombre',
						apellido: 'Apellido',
						genero: 'Género',
						correo: 'Correo',
						carnet: 'Carnet',
						cui: 'CUI',
					}}
					sumatoria={{}}
					onEdit={onEdit}
					onDelete={onDetail}
				/>
			</Principal>
			<ModalGenerica
				title='Detalle registro'
				open={openModal}
				setOpen={setOpenModal}>
				<DetalleUsuario registro={usuario} />
			</ModalGenerica>
		</>
	);
};

export default Usuarios;

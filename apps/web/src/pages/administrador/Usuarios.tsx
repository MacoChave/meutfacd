import { URL } from '@/api/server';
import { ErrorOperacion } from '@/components/ErrorOperacion';
import { ModalGenerica } from '@/components/ModalGenerica';
import { TablaGenerica } from '@/components/TablaGenerica';
import Principal from '@/components/contenido/Principal';
import { useFetch } from '@/hooks/useFetch';
import { SetStateAction, useState } from 'react';
import { DetalleUsuario } from './DetalleUsuario';
import { Tipo_Usuario } from '@/models/Perfil';
import { MyTable } from '@/components/MyTable';
import { Contenedor } from '@/components';

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
						apellido: 'Apellido',
						genero: 'Género',
						correo: 'Correo',
						carnet: 'Carnet',
						cui: 'CUI',
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

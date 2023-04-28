import { URL } from '@/api/server';
import { ErrorOperacion } from '@/components/ErrorOperacion';
import { TablaGenerica } from '@/components/TablaGenerica';
import Principal from '@/components/contenido/Principal';
import { useFetch } from '@/hooks/useFetch';

const Usuarios = () => {
	const { data, isSuccess, error } = useFetch({
		url: URL.USUARIO + '/todos',
		token: '1234',
		params: {},
	});

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
			<Principal titulo='Gestión de usuarios'>
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
					onEdit={(obj: any) => console.log('Editar')}
					onDelete={(obj: any) => console.log('Eliminar')}
				/>
			</Principal>
		</>
	);
};

export default Usuarios;

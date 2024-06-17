'use client';
import { Contenedor, DotsLoaders, ErrorOperacion } from '@/components';
import { URL } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import React, { lazy } from 'react';
import { useLocation } from 'react-router-dom';
const DetalleUsuario = lazy(() => import('../DetalleUsuario/DetalleUsuario'));

export type OneUserProps = {
	// types...
};

const OneUser: React.FC<OneUserProps> = ({}) => {
	const location = useLocation();
	const { usuario } = location.state;

	console.log({ usuario });

	const { data, error, isLoading, isError } = useFetch({
		url: `${URL.USER}/${usuario.id_usuario || 0}`,
		name: 'user',
	});

	console.log({ data, error });

	if (isLoading) {
		return <DotsLoaders />;
	}

	if (isError) {
		return (
			<ErrorOperacion
				error={data.error}
				mensaje='Hubo un error al obtener los datos del usuario'
			/>
		);
	}

	return (
		<Contenedor title='Detalle de usuario'>
			<DetalleUsuario registro={data.message} />
		</Contenedor>
	);
};

export default OneUser;

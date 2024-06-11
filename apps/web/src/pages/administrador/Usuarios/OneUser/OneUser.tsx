'use client';
import { Contenedor, DotsLoaders, ErrorOperacion } from '@/components';
import { TUser } from '@/models/Perfil';
import { schemaUsuario } from '@/models/TUser';
import { PersonalData } from '@/pages/Sesion/UserProfile/components/PersonalData';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import React, { Suspense } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { DetalleUsuario } from '../DetalleUsuario';
import { useFetch } from '@/hooks/useFetch';
import { URL_V2 } from '@/consts/Api';

export type OneUserProps = {
	// types...
};

const OneUser: React.FC<OneUserProps> = ({}) => {
	const location = useLocation();
	const { usuario } = location.state;

	const { data, error, isLoading, isError } = useFetch({
		url: `${URL_V2.USER}/${usuario.id_usuario || 0}`,
		name: 'user',
	});

	if (isLoading) <DotsLoaders />;

	if (isError)
		<ErrorOperacion
			error={error}
			mensaje='Hubo un error al obtener los datos del usuario'
		/>;

	return (
		<Contenedor title='Detalle de usuario'>
			<DetalleUsuario registro={usuario} />
		</Contenedor>
	);
};

export default OneUser;

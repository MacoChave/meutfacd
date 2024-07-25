'use client';
import { Contenedor, DotsLoaders, ErrorOperacion } from '@/components';
import { URL } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import { Box, Button } from '@mui/material';
import React, { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { Informacion } from '../components/Informacion';
import Progress from '@/pages/estudiante/Progress/Progress';
const DetalleUsuario = lazy(() => import('../DetalleUsuario/DetalleUsuario'));

export type OneUserProps = {
	// types...
};

const OneUser: React.FC<OneUserProps> = ({}) => {
	const location = useLocation();
	const { usuario } = location.state;

	const { data, error, isLoading, isError } = useFetch({
		url: `${URL.USER}/${usuario.id_usuario || 0}`,
		name: 'user',
	});

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
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 4,
				}}>
				<Box>
					<Informacion index={0} usuario={data!.message} />
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button color='primary' variant='outlined'>
							Ver información
						</Button>
						<Button
							color='primary'
							variant='contained'
							title='Gestionar permisos'>
							Gestionar permisos{' '}
						</Button>
					</Box>
				</Box>
				<Box sx={{ flex: 1 }}>
					<p>Componente Progreso del estudiante</p>
					<Progress />
				</Box>
			</Box>
		</Contenedor>
	);
};

export default OneUser;

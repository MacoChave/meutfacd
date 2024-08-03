'use client';
import { Contenedor, DotsLoaders, ErrorOperacion, McModal } from '@/components';
import { URL } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import { Box, Button } from '@mui/material';
import React, { lazy, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Informacion } from '../components/Informacion';
import Progress from '@/pages/estudiante/Progress/Progress';
import { Rol } from '../components/Rol';
const DetalleUsuario = lazy(() => import('../DetalleUsuario/DetalleUsuario'));

export type OneUserProps = {
	// types...
};

const OneUser: React.FC<OneUserProps> = ({}) => {
	const [openModal, setOpenModal] = useState(false);
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
		<>
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
								title='Gestionar permisos'
								onClick={() => setOpenModal(true)}>
								Gestionar permisos
							</Button>
						</Box>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Progress />
					</Box>
				</Box>
			</Contenedor>
			<McModal
				title='Edición de usuario'
				open={openModal}
				onClose={() => setOpenModal(false)}>
				<Rol usuario={usuario} index={0} />
			</McModal>
		</>
	);
};

export default OneUser;

import { Box, Checkbox, Typography } from '@mui/material';
import React from 'react';
import { TabsProps } from '../../propTypes/tabsProps';
import { useFetch } from '@/hooks/useFetch';
import { URL } from '@/consts/Api';
import { DotsLoaders, ErrorOperacion } from '@/components';
import { TResult } from '@/models/Fetching';
import { putData } from '@/services/fetching';

const Permisos: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	const { data, isLoading, isError, refetch } = useFetch({
		url: `${URL.PERMISSION}/all`,
		params: { id_usuario: usuario.id_usuario },
	});

	const edit = async (page: any) => {
		const result: TResult = await putData({
			path: `${URL.GENERIC}`,
			body: { table: 'ut_permiso', datos: { permiso: !page.permiso } },
			params: {
				id_usuario: usuario.id_usuario,
				id_rol: page.id_rol,
				id_pagina: page.id_hijo,
			},
		});
		refetch();
	};

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return (
			<ErrorOperacion
				mensaje='Error al obtener los permisos del usuario'
				error={null}
			/>
		);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					// width: { xs: '150px', sm: '300px', md: '400px' },
					gap: 2,
					p: 3,
				}}>
				{Object.entries(data).map(([key, value]: any) => (
					<>
						<Typography variant='body1'>{key}</Typography>
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns:
									'repeat(auto-fit, minmax(100px, 1fr))',
								gap: 2,
								p: 2,
								width: '100%',
							}}>
							{value.map((v: any) => (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										flexDirection: 'column',
										placeContent: 'center',
										alignItems: 'center',
									}}>
									<Typography variant='body2' align='center'>
										{v.n_hijo}
									</Typography>
									<Checkbox
										checked={v.permiso}
										onChange={() => edit(v)}
									/>
								</Box>
							))}
						</Box>
					</>
				))}
			</Box>
		</>
	);
};

export default Permisos;

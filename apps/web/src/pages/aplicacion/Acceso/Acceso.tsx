'use client';
import { Contenedor, DotsLoaders, ErrorOperacion } from '@/components';
import { URL } from '@/consts/Api';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { putData } from '@/services/fetching';
import { Box, Checkbox, Typography } from '@mui/material';
import React from 'react';

export type AccesoProps = {
	// types...
};

const Acceso: React.FC<AccesoProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.ACCESS}/all`,
		method: 'post',
	});

	const onEdit = async (registro: any) => {
		console.log({
			update: 'ut_acceso_rol',
			set: { activo: !registro.activo },
			where: {
				id_rol: registro.id_rol,
				id_pagina: registro.id_pagina,
			},
		});
		const result: TResult = await putData({
			path: `${URL.ACCESS}`,
			body: {
				activo: !registro.activo,
			},
			params: {
				id_rol: registro.id_rol,
				id_pagina: registro.id_pagina,
			},
		});
		if (result.affectedRows > 0) refetch();
	};

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return (
			<ErrorOperacion
				error={isError}
				mensaje='No se pudo recuperar los accesos'
			/>
		);

	return (
		<Contenedor title='Gestión de accesos'>
			{Object.entries(
				data.reduce((acc: any, item: any) => {
					if (!acc[item.rol]) acc[item.rol] = [];
					acc[item.rol].push({
						id_rol: item.id_rol,
						rol: item.rol,
						id_pagina: item.id_pagina,
						pagina: item.pagina,
						activo: item.activo,
					});
					return acc;
				}, [])
			).map(([key, value]: any, index: number) => (
				<>
					<Typography
						sx={{
							position: 'sticky',
							top: 0,
							backgroundColor: 'background.paper',
							p: 2,
							fontWeight: 'bold',
						}}
						variant='body1'>
						{key}
					</Typography>
					{value.map((v: any) => (
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								placeItems: 'center',
								gap: 2,
								p: 3,
							}}>
							<Typography variant='body2'>{v.pagina}</Typography>
							<Checkbox
								checked={v.activo}
								onChange={() => onEdit(v)}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						</Box>
					))}
				</>
			))}
		</Contenedor>
	);
};

export default Acceso;

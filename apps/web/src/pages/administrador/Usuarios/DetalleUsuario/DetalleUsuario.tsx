import { TUser } from '@/models/Perfil';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { SyntheticEvent, lazy, useState } from 'react';
const Informacion = lazy(() => import('../components/Informacion/Informacion'));
const Permisos = lazy(() => import('../components/Permisos/Permisos'));
const Rol = lazy(() => import('../components/Rol/Rol'));

export type DetalleUsuarioProps = {
	registro: TUser;
};

const allyProps = (index: any) => {
	return {
		id: `detalle-usuariopanel-${index}`,
		'aria-controls': `detalle-usuariopanel-${index}`,
	};
};

const DetalleUsuario: React.FC<DetalleUsuarioProps> = ({ registro }) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Box sx={{ display: 'flex' }}>
				<Typography sx={{ flex: 1 }}>
					{registro.correo || 'usuario@compania.com'}
				</Typography>
			</Box>
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs detalle usuario'>
					<Tab label='Información' {...allyProps(0)} />
					<Tab label='Rol' {...allyProps(1)} />
					<Tab label='Permisos' {...allyProps(2)} />
				</Tabs>
			</Box>
			{value === 0 ? (
				<Informacion usuario={registro} index={0} />
			) : value === 1 ? (
				<Rol usuario={registro} index={1} />
			) : (
				<Permisos usuario={registro} index={2} />
			)}
		</Box>
	);
};

export default DetalleUsuario;

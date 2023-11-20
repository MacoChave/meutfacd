import { TUser } from '@/models/Perfil';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Informacion } from '../components/Informacion';
import { Logs } from '../components/Logs';
import { Rol } from '../components/Rol';

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
					<Tab label='Logs' {...allyProps(2)} />
				</Tabs>
			</Box>
			{value === 0 ? (
				<Informacion usuario={registro} index={0} />
			) : value === 1 ? (
				<Rol usuario={registro} index={1} />
			) : (
				<Logs usuario={registro} index={2} />
			)}
		</Box>
	);
};

export default DetalleUsuario;

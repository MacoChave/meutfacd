import { Box, Typography } from '@mui/material';
import React from 'react';
import { TabsProps } from '../propTypes/tabsProps';

const Rol: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	console.log('> Rol.tsx: RolProps: usuario: ', usuario);
	return (
		<div
			role='tabpanel'
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			<Box sx={{ p: 3 }}>
				<Typography>Rol de {usuario.nombre}</Typography>
			</Box>
		</div>
	);
};

export default Rol;

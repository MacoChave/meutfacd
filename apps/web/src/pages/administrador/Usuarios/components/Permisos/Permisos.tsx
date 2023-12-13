import { Box, Typography } from '@mui/material';
import React from 'react';
import { TabsProps } from '../../propTypes/tabsProps';

const Logs: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { xs: '150px', sm: '300px', md: '400px' },
					gap: 2,
					p: 3,
				}}>
				<Typography>Permisos de {usuario.nombre}</Typography>
			</Box>
		</>
	);
};

export default Logs;

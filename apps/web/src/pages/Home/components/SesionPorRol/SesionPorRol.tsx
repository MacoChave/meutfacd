import { Person } from '@mui/icons-material';
import { Box, MenuItem, Typography } from '@mui/material';
import React from 'react';

export type SesionPorRolProps = {
	handleLogin: (rol: string) => void;
	handleLogup: (rol: string) => void;
	rol: string;
};

const SesionPorRol: React.FC<SesionPorRolProps> = ({
	handleLogin,
	handleLogup,
	rol,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				placeItems: 'center',
				gap: 2,
			}}>
			<Box
				sx={{
					display: 'flex',
					placeContent: 'center',
					flexWrap: 'nowrap',
					gap: 2,
				}}>
				<Person />
				<Typography>{rol.toUpperCase()}</Typography>
			</Box>
			<MenuItem onClick={() => handleLogin(rol)}>Iniciar sesión</MenuItem>
			<MenuItem onClick={() => handleLogup(rol)}>Crear usuario</MenuItem>
		</Box>
	);
};

export default SesionPorRol;

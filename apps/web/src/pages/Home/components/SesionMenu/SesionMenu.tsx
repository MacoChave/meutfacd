import { Box, Button, Menu } from '@mui/material';
import React, { useState } from 'react';
import { SesionPorRol } from '../SesionPorRol';

export type SesionMenuProps = {
	handleLogin: (rol: string) => void;
	handleLogup: (rol: string) => void;
};

const SesionMenu: React.FC<SesionMenuProps> = ({
	handleLogin,
	handleLogup,
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<Button
				id={`login-boton`}
				aria-controls={open ? 'login-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={(event) => setAnchorEl(event.currentTarget)}>
				Iniciar sesión
			</Button>
			<Menu
				id='login-menu'
				sx={{
					'& .MuiPaper-root': {
						left: 0,
						right: 0,
						marginX: 'auto',
						width: '90%',
						maxWidth: '90%',
					},
				}}
				aria-labelledby='login-boton'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-around',
						gap: 3,
						width: '100%',
						p: 2,
					}}>
					<SesionPorRol
						rol='estudiante'
						title='Estudiante'
						handleLogin={handleLogin}
						handleLogup={handleLogup}
					/>
					<SesionPorRol
						rol='docente'
						title='Administrativo'
						handleLogin={handleLogin}
						handleLogup={handleLogup}
					/>
					{/* <SesionPorRol
						rol='administrador'
						handleLogin={handleLogin}
						handleLogup={handleLogup}
					/> */}
				</Box>
			</Menu>
		</>
	);
};

export default SesionMenu;

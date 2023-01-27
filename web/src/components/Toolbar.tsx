import { AccountCircle, Close, Menu, Notifications } from '@mui/icons-material';
import {
	Alert,
	AppBar,
	Box,
	IconButton,
	Snackbar,
	Toolbar,
	Typography,
} from '@mui/material';
import { MouseEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps {
	children?: React.ReactNode;
}

export const ToolbarWithoutSesion = ({ children }: ToolbarProps) => {
	return (
		<AppBar
			position='fixed'
			color='primary'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<IconButton
					color='inherit'
					sx={{ mr: 2, display: { sm: 'none' } }}>
					<Menu />
				</IconButton>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1, display: { sx: 'none', sm: 'block' } }}>
					Unidad de tesis
				</Typography>
				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					{children}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export const ToolbarWithSesion = () => {
	const navigate = useNavigate();
	const [openSb, setOpensb] = useState(true);

	const handleLogout = (_: MouseEvent) => {
		console.log('Cerrar sesión');
		navigate('/login', { replace: true });
	};
	const handleProfile = (_: MouseEvent) => {
		console.log('Perfil');
	};
	const handleCloseSnackbar = (
		_: SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpensb(false);
	};
	const action = (
		<>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleCloseSnackbar}>
				<Close fontSize='small' />
			</IconButton>
		</>
	);

	return (
		<>
			<ToolbarWithoutSesion>
				<IconButton color='inherit'>
					<Notifications />
				</IconButton>
				<IconButton onClick={handleProfile} color='inherit'>
					<AccountCircle />
				</IconButton>
				<IconButton onClick={handleLogout} color='inherit'>
					Cerrar sesión
				</IconButton>
			</ToolbarWithoutSesion>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={openSb}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
				action={action}
			/>
		</>
	);
};

import { setLogout } from '@/redux/states';
import { AccountCircle, Close, Menu, Notifications } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { MouseEvent, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ToolbarProps {
	children?: React.ReactNode;
}

export const ToolbarWithoutSesion = ({ children }: ToolbarProps) => {
	return (
		<AppBar
			// position='fixed'
			color='primary'
			sx={{
				gridArea: 'header',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}>
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
	const dispatch = useDispatch();
	const [openSb, setOpensb] = useState(true);

	const handleLogout = (_: MouseEvent) => {
		dispatch(setLogout());
		navigate('/', { replace: true });
	};
	const handleProfile = (_: MouseEvent) => {
		navigate('perfil');
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
		</>
	);
};

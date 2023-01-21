import { AccountCircle, Menu, Notifications } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

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
	return (
		<ToolbarWithoutSesion>
			<IconButton color='inherit'>
				<Notifications />
			</IconButton>
			<IconButton color='inherit'>
				<AccountCircle />
			</IconButton>
			<IconButton color='inherit'>Cerrar sesión</IconButton>
		</ToolbarWithoutSesion>
	);
};

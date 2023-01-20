import { AccountCircle, Menu, Notifications } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

interface ToolbarProps {
	children?: React.ReactNode;
}

export const ToolbarWithoutSesion = ({ children }: ToolbarProps) => {
	return (
		<AppBar>
			<Toolbar>
				<IconButton
					color='secondary'
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
			<IconButton color='secondary'>
				<Notifications />
			</IconButton>
			<IconButton color='secondary'>
				<AccountCircle />
			</IconButton>
			<IconButton color='secondary'>Cerrar sesión</IconButton>
		</ToolbarWithoutSesion>
	);
};

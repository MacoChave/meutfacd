import {
	AdminPanelSettings,
	BugReport,
	ManageAccounts,
	Monitor,
	Settings,
} from '@mui/icons-material';
import { Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layaouts/Dashboard';
import { MenuItem } from '../../propTypes/Appbar';

const menuArray: MenuItem[] = [
	{
		text: 'Usuarios',
		description: 'Creación y gestión de cuentas de usuarios',
		path: 'usuarios',
		icon: <ManageAccounts />,
	},
	{
		text: 'Permisos',
		description: 'Configuración de permisos',
		path: 'permisos',
		icon: <AdminPanelSettings />,
	},
	{
		text: 'Actividades',
		description: 'Monitorio de actividades',
		path: 'actividades',
		icon: <Monitor />,
	},
	{
		text: 'Aplicación',
		description: 'Configuración de la aplicación',
		path: 'aplicacion',
		icon: <Settings />,
	},
	{
		text: 'Problemas',
		description: 'Gestión de problemas técnicos',
		path: 'problemas',
		icon: <BugReport />,
	},
];

const HomeAdministrador = () => {
	return (
		<Dashboard menuArray={menuArray}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					placeItems: 'center',
					gap: 4,
					width: '100vw',
					height: '95vh',
				}}>
				<Toolbar />
				<Outlet />
				<Box>
					<Typography textAlign='center'>
						Administración 2021-2025 Decano Henry Arraiga
					</Typography>
				</Box>
			</Box>
		</Dashboard>
	);
};

export default HomeAdministrador;

import { Box, Toolbar } from '@mui/material';
import Dashboard from '../../layaouts/Dashboard';
import { Outlet } from 'react-router-dom';
import { MenuItem } from '../../propTypes/Appbar';
import {
	AdminPanelSettings,
	BugReport,
	ManageAccounts,
	Monitor,
	ReportProblem,
	Settings,
} from '@mui/icons-material';

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
					width: '100%',
				}}>
				<Toolbar />
				<Outlet />
			</Box>
		</Dashboard>
	);
};

export default HomeAdministrador;

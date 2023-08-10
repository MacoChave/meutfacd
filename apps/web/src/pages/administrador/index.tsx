import { URL } from '@/api/server';
import { useFetch } from '@/hooks/useFetch';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

// const menuArray: MenuItem[] = [
// 	{
// 		nombre: 'Usuarios',
// 		description: 'Creación y gestión de cuentas de usuarios',
// 		ruta: 'usuarios',
// 		icon: <ManageAccounts />,
// 	},
// 	{
// 		nombre: 'Permisos',
// 		description: 'Configuración de permisos',
// 		ruta: 'permisos',
// 		icon: <AdminPanelSettings />,
// 	},
// 	{
// 		nombre: 'Actividades',
// 		description: 'Monitorio de actividades',
// 		ruta: 'actividades',
// 		icon: <Monitor />,
// 	},
// 	{
// 		nombre: 'Aplicación',
// 		description: 'Configuración de la aplicación',
// 		ruta: 'aplicacion',
// 		icon: <Settings />,
// 	},
// 	{
// 		nombre: 'Problemas',
// 		description: 'Gestión de problemas técnicos',
// 		ruta: 'problemas',
// 		icon: <BugReport />,
// 	},
// ];

const HomeAdministrador = () => {
	const { data, isLoading, isError } = useFetch({
		url: `${URL.PERMISSION}/all`,
	});
	return (
		<Dashboard>
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

import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

// const menuArray: MenuItem[] = [
// 	{
// 		nombre: 'Resumen',
// 		description: 'Resumen por ciclo lectivo',
// 		ruta: 'resumen',
// 		icon: <Home />,
// 	},
// 	{
// 		nombre: 'Estaciones',
// 		description: 'Resumen por estaciones',
// 		ruta: 'por-estacion',
// 		icon: <Description />,
// 	},
// {
// 	text: 'Por rol',
// 	description: 'Resumen por rol',
// 	path: 'por-rol',
// 	icon: <Assignment />,
// },
// ];

const HomeReporte = () => {
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

export default HomeReporte;

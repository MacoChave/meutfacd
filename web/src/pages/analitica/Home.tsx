import {
	Assignment,
	Description,
	Groups,
	Home,
	Preview,
} from '@mui/icons-material';
import { MenuItem } from '../../propTypes/Appbar';
import Dashboard from '../../layaouts/Dashboard';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

const menuArray: MenuItem[] = [
	{
		text: 'Resumen',
		description: 'Resumen por ciclo lectivo',
		path: 'resumen',
		icon: <Home />,
	},
	{
		text: 'Estaciones',
		description: 'Resumen por estaciones',
		path: 'por-estacion',
		icon: <Description />,
	},
	{
		text: 'Por rol',
		description: 'Resumen por rol',
		path: 'por-rol',
		icon: <Assignment />,
	},
];

const HomeReporte = () => {
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

export default HomeReporte;

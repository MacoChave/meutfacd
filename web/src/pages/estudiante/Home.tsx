import { Outlet } from 'react-router-dom';
import Dashboard from '../../layaouts/Dashboard';
import { MenuItem } from '../../propTypes/Appbar';
import {
	Assignment,
	Description,
	Groups,
	Home,
	Preview,
} from '@mui/icons-material';
import { Box, Toolbar } from '@mui/material';

const menuArray: MenuItem[] = [
	{
		text: 'Progreso',
		description: 'Ver mi progreso del proceso',
		path: 'progreso',
		icon: <Home />,
	},
	{
		text: 'Estación 1',
		description: 'Enviar punto de tesis',
		path: 'estacion1',
		icon: <Description />,
	},
	{
		text: 'Estación 2',
		description: 'Curso 1',
		path: 'estacion2',
		icon: <Assignment />,
	},
	{
		text: 'Estación 3',
		description: 'Curso 2',
		path: 'estacion3',
		icon: <Assignment />,
	},
	{
		text: 'Estación 4',
		description: 'Comisión y estilo',
		path: 'estacion4',
		icon: <Preview />,
	},
	{
		text: 'Estación 5',
		description: 'Previos internos',
		path: 'estacion5',
		icon: <Groups />,
	},
	// {
	// 	text: 'Finalizar',
	// 	description: 'Finalizar proceso',
	// 	path: 'finalizar',
	// 	icon: <Assignment />,
	// },
];

const HomeEstudiante = () => {
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

export default HomeEstudiante;

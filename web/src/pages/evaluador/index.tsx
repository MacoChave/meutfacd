import { Box, Toolbar } from '@mui/material';
import Dashboard from '../../layaouts/Dashboard';
import { Outlet } from 'react-router-dom';
import { Assignment, Description, Groups, Preview } from '@mui/icons-material';
import { MenuItem } from '../../propTypes/Appbar';

const menuArray: MenuItem[] = [
	{
		text: 'Estación 1',
		description: 'Revisar puntos de tesis',
		path: 'estacion1',
		icon: <Description />,
	},
	{
		text: 'Estación 2',
		description: 'Asignar curso 1',
		path: 'estacion2',
		icon: <Assignment />,
	},
	{
		text: 'Estación 3',
		description: 'Asignar curso 2',
		path: 'estacion3',
		icon: <Assignment />,
	},
	{
		text: 'Estación 4',
		description: 'Revisión de comisión y estilo',
		path: 'estacion4',
		icon: <Preview />,
	},
	{
		text: 'Estación 5',
		description: 'Revisión de previos internos',
		path: 'estacion5',
		icon: <Groups />,
	},
];

const HomeEvaluador = () => {
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

export default HomeEvaluador;

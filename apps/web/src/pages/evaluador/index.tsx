import { Box, Toolbar } from '@mui/material';
import Dashboard from '../../layouts/Dashboard';
import { Outlet } from 'react-router-dom';
import { Assignment, Description, Groups, Preview } from '@mui/icons-material';
import { MenuItem } from '../../propTypes/Appbar';

const menuArray: MenuItem[] = [
	{
		nombre: 'Estación 1',
		description: 'Revisar puntos de tesis',
		ruta: 'estacion1',
		icon: <Description />,
	},
	{
		nombre: 'Estación 2',
		description: 'Asignar curso 1',
		ruta: 'estacion2',
		icon: <Assignment />,
	},
	{
		nombre: 'Estación 3',
		description: 'Asignar curso 2',
		ruta: 'estacion3',
		icon: <Assignment />,
	},
	{
		nombre: 'Estación 4',
		description: 'Revisión de comisión y estilo',
		ruta: 'estacion4',
		icon: <Preview />,
	},
	{
		nombre: 'Estación 5',
		description: 'Revisión de previos internos',
		ruta: 'estacion5',
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

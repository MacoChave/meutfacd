import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

// const menuArray = [
// 	{
// 		text: 'Asignar',
// 		description: 'Asignar estudiantes a evaluadores',
// 		path: 'asignar',
// 		icon: <Assignment />,
// 	},
// 	{
// 		text: 'Citas',
// 		description: 'Ver citas de estudiantes',
// 		path: 'citas',
// 		icon: <PlaylistAddCheck />,
// 	},
// ];

const HomeEncargado = () => {
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

export default HomeEncargado;
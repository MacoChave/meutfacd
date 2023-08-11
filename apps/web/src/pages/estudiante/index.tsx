import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

const HomeEstudiante = () => {
	return (
		<Dashboard>
			<Box
				sx={{
					width: '90%',
					mx: 'auto',
				}}>
				<Toolbar />
				<Toolbar />
				<Outlet />
			</Box>
		</Dashboard>
	);
};

export default HomeEstudiante;

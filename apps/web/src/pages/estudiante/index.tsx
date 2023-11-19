import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../components/Layout/Dashboard/Dashboard';

const HomeEstudiante = () => {
	return (
		<Dashboard>
			<Box>
				<Toolbar />
				<Toolbar />
				<Outlet />
			</Box>
		</Dashboard>
	);
};

export default HomeEstudiante;

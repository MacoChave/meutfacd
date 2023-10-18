import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useFetch } from '@/hooks/useFetch';
import { Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

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

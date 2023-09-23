import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useFetch } from '@/hooks/useFetch';
import { Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

const HomeEstudiante = () => {
	const {
		data: options,
		isLoading,
		isError,
	} = useFetch({
		url: `${URL.PERMISSION}/ALL`,
		params: {},
	});

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return <Typography>No se pudieron cargar los permisos</Typography>;

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

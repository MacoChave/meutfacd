import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';
import { useFetch } from '@/hooks/useFetch';
import { URL } from '@/api/server';
import { Loader } from '@/components';

const HomeEstudiante = () => {
	const {
		data: options,
		isLoading,
		isError,
	} = useFetch({
		url: `${URL.PERMISSION}/ALL`,
		params: {},
	});

	if (isLoading) return <Loader />;
	if (isError) return <div>Error</div>;

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

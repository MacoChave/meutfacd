import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';
import { useFetch } from '@/hooks/useFetch';
import { URL } from '@/api/server';

const HomeAdministrador = () => {
	const { data, isLoading, isError } = useFetch({
		url: `${URL.PERMISSION}/all`,
	});
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

export default HomeAdministrador;

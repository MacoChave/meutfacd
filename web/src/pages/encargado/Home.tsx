import { Box, Toolbar } from '@mui/material';
import Dashboard from '../../layaouts/Dashboard';
import { Outlet } from 'react-router-dom';

const HomeEncargado = () => {
	return (
		<Dashboard menuArray={[]}>
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

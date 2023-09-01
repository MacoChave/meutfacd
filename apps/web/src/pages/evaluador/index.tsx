import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';

const HomeEvaluador = () => {
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

export default HomeEvaluador;

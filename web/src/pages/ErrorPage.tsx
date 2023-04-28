import { Box, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<>
			<Box>
				<Typography variant='h1'>Ooops!</Typography>
				<Typography variant='h2'>404</Typography>
				<Typography variant='h3'>Page not found</Typography>
			</Box>
		</>
	);
};

export default ErrorPage;

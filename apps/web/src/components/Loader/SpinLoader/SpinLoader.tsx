import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export type SpinLoaderProps = {
	message: string;
};

const SpinLoader: React.FC<SpinLoaderProps> = ({ message = '' }) => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				width: '100vw',
				gap: 2,
				backgroundColor: 'rgba(0,0,0,0.7)',
				color: 'primary.contrastText',
			}}>
			<CircularProgress color='secondary' />
			<Typography variant='h3'>{message}</Typography>
		</Box>
	);
};

export default SpinLoader;

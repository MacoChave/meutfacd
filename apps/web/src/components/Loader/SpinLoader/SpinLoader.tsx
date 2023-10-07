import { Box, Typography } from '@mui/material';
import React from 'react';
import './SpinLoader.css';

export type SpinLoaderProps = {
	message?: string;
};

const SpinLoader: React.FC<SpinLoaderProps> = ({
	message = 'Espera un momento',
}) => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				display: 'flex',
				flexDirection: 'column',
				width: '100vw',
				height: '100vh',
				gap: 4,
				placeContent: 'center',
				placeItems: 'center',
				backgroundColor: 'rgba(0,0,0,0.5)',
			}}>
			<Box className='loader' component={'div'} />
			<Typography variant='h4' color={'white'}>
				{message}
			</Typography>
		</Box>
	);
};

export default SpinLoader;

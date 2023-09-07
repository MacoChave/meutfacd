import React from 'react';
import './SpinLoader.css';
import { Box } from '@mui/material';

export type SpinLoaderProps = {
	message?: string;
};

const SpinLoader: React.FC<SpinLoaderProps> = ({ message = '' }) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				m: 'auto',
			}}>
			<div className='loader'></div>
		</Box>
	);
};

export default SpinLoader;

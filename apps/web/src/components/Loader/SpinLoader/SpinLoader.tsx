import React from 'react';
import './SpinLoader.css';
import { Box } from '@mui/material';

export type SpinLoaderProps = {
	message?: string;
};

const SpinLoader: React.FC<SpinLoaderProps> = ({ message = '' }) => {
	return <Box className='loader' component={'div'} />;
};

export default SpinLoader;

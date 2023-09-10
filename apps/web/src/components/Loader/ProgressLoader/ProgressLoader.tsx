import React from 'react';
import './ProgressLoader.css';
import { Box } from '@mui/material';

export type ProgressLoaderProps = {};

const ProgressLoader: React.FC<ProgressLoaderProps> = ({}) => {
	return <Box className='loader' component={'div'} />;
};

export default ProgressLoader;

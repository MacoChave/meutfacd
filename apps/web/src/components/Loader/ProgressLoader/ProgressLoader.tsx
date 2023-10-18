import React from 'react';
import './ProgressLoader.css';
import { Box } from '@mui/material';

export type ProgressLoaderProps = {};

const ProgressLoader: React.FC<ProgressLoaderProps> = ({}) => {
	return <Box className='loader__progress' component={'div'} />;
};

export default ProgressLoader;

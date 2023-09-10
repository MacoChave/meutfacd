import React from 'react';
import './DotsLoaders.css';
import { Box } from '@mui/material';

export type DotsLoadersProps = {};

const DotsLoaders: React.FC<DotsLoadersProps> = ({}) => {
	return <Box className='loader' component={'div'} />;
};

export default DotsLoaders;

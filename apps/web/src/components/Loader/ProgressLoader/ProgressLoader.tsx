import React from 'react';
import './ProgressLoader.css';
import { Box } from '@mui/material';

export type ProgressLoaderProps = {};

const ProgressLoader: React.FC<ProgressLoaderProps> = ({}) => {
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

export default ProgressLoader;

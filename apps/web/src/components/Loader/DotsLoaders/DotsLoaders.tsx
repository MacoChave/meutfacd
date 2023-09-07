import React from 'react';
import './DotsLoaders.css';
import { Box } from '@mui/material';

export type DotsLoadersProps = {};

const DotsLoaders: React.FC<DotsLoadersProps> = ({}) => {
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

export default DotsLoaders;

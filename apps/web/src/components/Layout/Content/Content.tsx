import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export type ContentProps = {};

const Content: React.FC<ContentProps> = ({}) => {
	return (
		<Box
			sx={{
				overflowY: 'scroll',
				// background: 'rgba(255,255,255,0.25)',
				// backdropFilter: 'blur(5px)',
				height: '100%',
			}}>
			<Toolbar />
			<Outlet />
		</Box>
	);
};

export default Content;

import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export type ContentProps = {};

const Content: React.FC<ContentProps> = ({}) => {
	return (
		<Box
			sx={{
				gridArea: 'main',
				overflowY: 'scroll',
			}}>
			<Toolbar />
			<Toolbar />
			<Outlet />
		</Box>
	);
};

export default Content;

import store from '@/redux/store';
import { stringToCapitalize } from '@/utils/formatHandler';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

export type ContenedorProps = {
	title: string;
	children: React.ReactNode;
};

const Contenedor: React.FC<ContenedorProps> = ({ title, children }) => {
	const { auth } = store.getState().control;

	return (
		<Card
			sx={{
				p: 2,
				mx: 'auto',
				display: 'flex',
				flexDirection: 'column',
				background: 'rgba(255,255,255,0.25)',
				backdropFilter: 'blur(5px)',
				// width: { xs: '90%', md: '85%' },
				overflowX: 'scroll',
			}}>
			<Typography variant='h4' component='h2' textAlign='center'>
				{stringToCapitalize(title)}
			</Typography>
			<Typography variant='body1' component='p' textAlign='center'>
				{auth.name || 'Usuario X'}
			</Typography>
			<Box
				sx={{
					p: 2,
					width: {
						xs: 'calc(90vw - 60px)',
						md: 'calc(90vw - 200px)',
					},
					mx: 'auto',
				}}>
				{children}
			</Box>
		</Card>
	);
};

export default Contenedor;

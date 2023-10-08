import store from '@/redux/store';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

export type ContenedorProps = {
	title: string;
	children: React.ReactNode;
};

const Contenedor: React.FC<ContenedorProps> = ({ title, children }) => {
	const { auth } = store.getState().control;

	return (
		<>
			<Card
				sx={{
					p: 2,
					// mx: 'auto',
					// display: 'flex',
					// flexDirection: 'column',
					// placeContent: 'center',
					// placeItems: 'center',
					// width: { xs: '90%', md: '80%' },
				}}>
				<Typography variant='h4' component='h2' textAlign='center'>
					{title}
				</Typography>
				<Typography variant='body1' component='p' textAlign='center'>
					{auth.name || 'Usuario X'}
				</Typography>
				<Box
					sx={{
						py: 2,
						width: {
							xs: 'calc(90vw - 60px)',
							md: 'calc(90vw - 200px)',
						},
						mx: 'auto',
					}}>
					{children}
				</Box>
			</Card>
		</>
	);
};

export default Contenedor;

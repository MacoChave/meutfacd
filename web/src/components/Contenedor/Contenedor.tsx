import { useAuthStore } from '@/hooks/useAuthStore';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

export type ContenedorProps = {
	title: string;
	children: React.ReactNode;
};

const Contenedor: React.FC<ContenedorProps> = ({ title, children }) => {
	const { estado } = useAuthStore();
	return (
		<>
			<Card
				sx={{
					p: 2,
					m: 2,
					display: 'flex',
					flexDirection: 'column',
					placeContent: 'center',
					placeItems: 'center',
					width: { xs: '90vw', md: '80vw' },
				}}>
				<Typography variant='h4' component='h2' textAlign='center'>
					{title}
				</Typography>
				<Typography variant='body1' component='p' textAlign='center'>
					{estado.usuario.nombre || 'Usuario X'}
				</Typography>
				<Box
					sx={{
						py: 2,
						width: { xs: '60vw', md: '50vw' },
					}}>
					{children}
				</Box>
			</Card>
		</>
	);
};

export default Contenedor;

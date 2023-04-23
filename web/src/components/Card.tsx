import { Box, Card, Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';

const Contenedor = ({
	title,
	children,
	...props
}: {
	title: string;
	children: ReactNode;
}) => {
	const { estado } = useAuthStore();

	return (
		<>
			<Card sx={{ p: 4 }}>
				<Typography variant='h4' component='h2' textAlign='center'>
					{title}
				</Typography>
				<Typography variant='body1' component='p' textAlign='center'>
					{estado.usuario.nombre || 'Usuario X'}
				</Typography>
				<Box sx={{ py: 2, width: { xs: '60vw', md: '50vw' } }} />
				{children}
			</Card>
		</>
	);
};

export default Contenedor;

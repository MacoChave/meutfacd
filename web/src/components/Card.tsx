import { Box, Card, Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';

const Contenedor = ({
	title,
	children,
	...props
}: {
	title: string;
	children: ReactNode;
}) => {
	return (
		<>
			<Card sx={{ p: 4 }}>
				<Typography variant='h4' component='h2' textAlign='center'>
					{title}
				</Typography>
				<Typography variant='body1' component='p' textAlign='center'>
					Usuario x
				</Typography>
				<Box sx={{ py: 2, width: { xs: '60vw', md: '50vw' } }} />
				{children}
			</Card>
		</>
	);
};

export default Contenedor;

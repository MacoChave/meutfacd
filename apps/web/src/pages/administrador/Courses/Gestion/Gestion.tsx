import { Box, Typography } from '@mui/material';
import React from 'react';
import { Form } from './Form';

export type GestionProps = Record<string, never>;

const Gestion: React.FC<GestionProps> = ({}) => {
	const onClose = () => {};
	return (
		<Box>
			<Typography variant='h5' component={'h2'} gutterBottom>
				Crear cursos
			</Typography>
			<Form onClose={onClose} />
		</Box>
	);
};

export default Gestion;

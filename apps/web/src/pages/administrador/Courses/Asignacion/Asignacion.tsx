import { Box, Typography } from '@mui/material';
import React from 'react';

export type AsignacionProps = Record<string, never>;

const Asignacion: React.FC<AsignacionProps> = ({}) => {
	return (
		<Box>
			<Typography variant='h5' component={'h2'} gutterBottom>
				Asignación de tutores
			</Typography>
			<Box>Listado de cursos</Box>
			<Box>Listado de profesores</Box>
			<Box>Listado de cursos asignados</Box>
		</Box>
	);
};

export default Asignacion;

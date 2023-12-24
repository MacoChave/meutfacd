'use client';
import { Contenedor } from '@/components';
import { Box } from '@mui/material';
import React from 'react';

export type ProgresosProps = {
	// types...
};

const Progresos: React.FC<ProgresosProps> = ({}) => {
	return (
		<>
			<Contenedor title='Progresos por ciclo / estación'>
				<Box></Box>
			</Contenedor>
		</>
	);
};

export default Progresos;

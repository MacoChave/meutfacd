import { Box, Typography } from '@mui/material';
import Barra from './Barra';
import { Boton } from '../controles/Boton';
import { SyntheticEvent } from 'react';

type PrincipalProps = {
	titulo: string;
	handleAgregar: (event: SyntheticEvent) => void;
	children: React.ReactNode | React.ReactNode[];
};

const Principal = ({ titulo, handleAgregar, children }: PrincipalProps) => {
	return (
		<>
			<Box
				sx={{
					width: '90%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}>
				<Barra titulo={titulo} handleAgregar={handleAgregar} />
				{children}
			</Box>
		</>
	);
};

export default Principal;

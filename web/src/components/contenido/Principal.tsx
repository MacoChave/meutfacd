import { Box, Typography } from '@mui/material';
import Barra from './Barra';
import { Boton } from '../controles/Boton';

type PrincipalProps = {
	titulo: string;
	children: React.ReactNode | React.ReactNode[];
};

const Principal = ({ titulo, children }: PrincipalProps) => {
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
				<Barra titulo={titulo} />
				{children}
			</Box>
		</>
	);
};

export default Principal;

import { BotonPrimario } from '@/components/controles/Boton';
import { Box, Typography } from '@mui/material';
import React from 'react';

export type ErrorPageProps = {
	codigo: number;
	mensaje: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ codigo, mensaje }) => {
	const handleClick = () => {
		window.history.back();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				placeContent: 'center',
				placeItems: 'center',
				gap: 2,
				height: '100vh',
				width: '100vw',
			}}>
			<img src='' alt='' />
			<Typography variant='h1'>Ooops!</Typography>
			<Typography variant='h4'>{codigo}</Typography>
			<Typography variant='body1'>{mensaje}</Typography>
			<BotonPrimario handleClick={handleClick}>Regresar</BotonPrimario>
		</Box>
	);
};

export default ErrorPage;

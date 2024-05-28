import { Box, Button, Typography } from '@mui/material';
import React, { lazy } from 'react';

export type ErrorPageProps = {
	codigo: number;
	mensaje: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ codigo, mensaje }) => {
	const handleClick = () => {
		if (codigo === 404) window.location.replace('/');
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
			<Button variant='contained' color='primary' onClick={handleClick}>
				Regresar
			</Button>
		</Box>
	);
};

export default ErrorPage;

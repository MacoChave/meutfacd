import { Box, Typography } from '@mui/material';
import React from 'react';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
	return (
		<Box
			sx={{
				mx: 'auto',
				background: 'rgba(255,255,255,0.25)',
				backdropFilter: 'blur(5px)',
				width: '100%',
				p: 2,
				color: 'black',
				textShadow: '0 0 4px white',
			}}>
			<Typography
				sx={{
					textAlign: 'center',
				}}
				variant='subtitle2'>
				Administración 2021-2025 Decano Henry Arraiga
			</Typography>
			<Typography
				sx={{
					textAlign: 'center',
					fontSize: { xs: '0.6rem', md: '0.8rem' },
				}}
				variant='subtitle2'>
				Desarrollado por: <strong>Ing. Marco Chávez</strong>
			</Typography>
		</Box>
	);
};

export default Footer;

'use client';
import logo_light from '@/assets/svg/logo_sider_light.svg';
import logo_dark from '@/assets/svg/logo_sider_dark.svg';
import { Box } from '@mui/material';
import React from 'react';

export type SiderLogotipoProps = {
	variant: 'light' | 'dark';
};

const SiderLogotipo: React.FC<SiderLogotipoProps> = ({ variant = 'light' }) => {
	return (
		<Box
			sx={{
				pb: 2,
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<img
				src={variant === 'light' ? logo_light : logo_dark}
				alt='Facultad de Ciencias Jurídicas y Sociales'
				loading='lazy'
				style={{ height: '8rem' }}
			/>
		</Box>
	);
};

export default SiderLogotipo;

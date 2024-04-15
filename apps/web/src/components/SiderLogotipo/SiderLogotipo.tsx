'use client';
import sider_horizontal_light from '@/assets/webp/SIDER_light_horizontal.webp';
import sider_horizontal_dark from '@/assets/webp/SIDER_dark_horizontal.webp';
import sider_vertical_light from '@/assets/webp/SIDER_light_vertical.webp';
import sider_vertical_dark from '@/assets/webp/SIDER_dark_vertical.webp';
import { Box } from '@mui/material';
import React from 'react';

export type SiderLogotipoProps = {
	variant?: 'light' | 'dark';
	orientation?: 'vertical' | 'horizontal';
};

function getLogo(variant: string, orientation: string) {
	if (variant === 'light') {
		if (orientation === 'vertical') {
			return sider_vertical_light;
		}
		return sider_horizontal_light;
	}
	if (orientation === 'vertical') {
		return sider_vertical_dark;
	}
	return sider_horizontal_dark;
}

const SiderLogotipo: React.FC<SiderLogotipoProps> = ({
	variant = 'light',
	orientation = 'horizontal',
}) => {
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
				src={getLogo(variant, orientation)}
				alt='Facultad de Ciencias Jurídicas y Sociales'
				loading='lazy'
				style={{ height: '8rem' }}
			/>
		</Box>
	);
};

export default SiderLogotipo;

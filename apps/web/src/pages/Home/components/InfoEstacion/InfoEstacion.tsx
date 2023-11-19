import { Box, Typography } from '@mui/material';
import React from 'react';

export type InfoEstacionProps = {
	title: string;
	subtitle?: string;
	webp: string;
	jpg: string;
	alt: string;
};

const InfoEstacion: React.FC<InfoEstacionProps> = ({
	title,
	subtitle,
	webp,
	jpg,
	alt,
}) => {
	return (
		<Box>
			<Box
				sx={{
					background: '#00225B',
					color: 'white',
					py: 2,
					textAlign: 'center',
				}}>
				<Typography sx={{ textTransform: 'uppercase' }} variant='h5'>
					{title}
				</Typography>
				<Typography sx={{ textTransform: 'uppercase' }} variant='h6'>
					{subtitle}
				</Typography>
			</Box>
			<Box
				sx={{ width: { xs: '95%', md: '90%', lg: '60%' }, mx: 'auto' }}>
				<picture>
					<source srcSet={webp} type='image/webp' />
					<source srcSet={jpg} type='image/jpeg' />
					<img
						style={{
							width: '100%',
							height: 'auto',
							objectFit: 'cover',
						}}
						src={jpg}
						alt={alt}
						loading='lazy'
					/>
				</picture>
			</Box>
		</Box>
	);
};

export default InfoEstacion;

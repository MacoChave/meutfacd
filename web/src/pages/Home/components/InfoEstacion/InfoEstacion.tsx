import { Box, Typography } from '@mui/material';
import React from 'react';

export type InfoEstacionProps = {
	title: string;
	subtitle?: string;
	img: string;
	alt: string;
};

const InfoEstacion: React.FC<InfoEstacionProps> = ({
	title,
	subtitle,
	img,
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
			<Box sx={{ width: '70%', mx: 'auto' }}>
				<img
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
					}}
					src={img}
					alt={alt}
				/>
			</Box>
		</Box>
	);
};

export default InfoEstacion;

import React from 'react';
import { Contenedor } from '../Contenedor';
import { Box, Typography } from '@mui/material';
import imgEmpty from '@/assets/svg/no_data.svg';

export type EmptyReviewProps = {
	title: string;
};

const EmptyReview: React.FC<EmptyReviewProps> = ({ title }) => {
	return (
		<>
			<Contenedor title={title}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						placeContent: 'center',
						placeItems: 'center',
						gap: 4,
					}}>
					<Typography variant='h6'>Aún no hay datos</Typography>
					<Typography variant='body1'>
						Asegurese de aprobar todos los requisitos del paso
						previo
					</Typography>
				</Box>
			</Contenedor>
		</>
	);
};

export default EmptyReview;

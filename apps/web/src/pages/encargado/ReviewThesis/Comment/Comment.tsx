import { Button, Card, TextField, Typography } from '@mui/material';
import React from 'react';

export type CommentProps = {};

const Comment: React.FC<CommentProps> = ({}) => {
	return (
		<Card
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				placeContent: 'center',
				placeItems: 'center',
				p: 4,
				gap: 4,
			}}>
			<Typography variant='body1' component={'h2'}>
				Agregar comentarios
			</Typography>
			<TextField
				label=''
				type='text'
				value={''}
				onChange={(value) => {
					console.log('Change comment', value);
				}}
			/>
			<Button variant='contained' color='primary' type='submit'>
				Agendar cita
			</Button>
		</Card>
	);
};

export default Comment;

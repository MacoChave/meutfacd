import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import React, { Dispatch, ReactNode } from 'react';

export type McModalProps = {
	title: string;
	open: boolean;
	children: ReactNode;
	onClose: () => void;
};

const McModal: React.FC<McModalProps> = ({
	title,
	open,
	children,
	onClose: onClose,
}) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					// height: '80vh',
					width: { xs: '90vw', sm: '80vw', md: '60vw' },
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
					overflowY: 'auto',
				}}>
				<IconButton
					sx={{ position: 'absolute', top: 0, right: 0 }}
					color='primary'
					onClick={onClose}>
					<Close />
				</IconButton>
				<Typography
					variant='h6'
					component='h2'
					sx={{ fontWeight: 'bold' }}>
					{title}
				</Typography>
				<Divider sx={{ my: 1 }} />
				{children}
			</Box>
		</Modal>
	);
};

export default McModal;

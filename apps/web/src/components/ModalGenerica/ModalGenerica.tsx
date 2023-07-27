import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import React, { Dispatch, ReactNode } from 'react';

export type ModalGenericaProps = {
	title: string;
	open: boolean;
	setOpen: Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
};

const ModalGenerica: React.FC<ModalGenericaProps> = ({
	title,
	open,
	setOpen,
	children,
}) => {
	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					height: '80vh',
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}>
				<IconButton
					sx={{ position: 'absolute', top: 0, right: 0 }}
					color='primary'
					onClick={() => setOpen(false)}>
					<Close />
				</IconButton>
				<Typography
					variant='h6'
					component='h2'
					sx={{ fontWeight: 'bold' }}>
					{title}
				</Typography>
				<Divider />
				{children}
			</Box>
		</Modal>
	);
};

export default ModalGenerica;

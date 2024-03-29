import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export type DialogoProps = {
	title: string;
	open: boolean;
	children: ReactNode;
	setOpen: (open: boolean) => void;
};

const Dialogo: FC<DialogoProps> = ({
	title,
	open,
	children,
	setOpen: setOpen,
}) => {
	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box sx={style}>
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
		</>
	);
};

export default Dialogo;

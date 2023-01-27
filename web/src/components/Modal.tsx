import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import { ModalProps } from '../propTypes/Modal';
import { Close } from '@mui/icons-material';

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

const Dialogo = ({ title, open, setOpen: setOpen, children }: ModalProps) => {
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

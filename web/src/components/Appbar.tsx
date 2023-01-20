import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { AppbarProps } from '../propTypes/Appbar';

const Appbar = ({ open, setOpen }: AppbarProps) => {
	const handleDrawerOpen = (e: any) => {
		setOpen(true);
	};

	return (
		<>
			<AppBar position='fixed' color='primary'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}>
						<Menu />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Unidad de tesis
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Appbar;

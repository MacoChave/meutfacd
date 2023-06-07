import { AppBar, Toolbar, Typography } from '@mui/material';
import { AppbarProps } from '../../propTypes/Appbar';

const Appbar = ({ open, setOpen }: AppbarProps) => {
	const handleDrawerOpen = (e: any) => {
		setOpen(true);
	};

	return (
		<>
			<AppBar
				position='fixed'
				color='primary'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					{/* <IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}>
						<Menu />
					</IconButton> */}
					<Typography variant='h6' noWrap component='div'>
						Unidad de tesis
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Appbar;

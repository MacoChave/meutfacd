import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { AppbarProps } from '../propTypes/Appbar';
import { ChevronLeft, Book } from '@mui/icons-material';

const Sidebar = ({ open, setOpen }: AppbarProps) => {
	const handleDrawerClose = (e: any) => {
		setOpen(false);
	};
	return (
		<>
			<Drawer variant='permanent' open={open}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeft />
				</IconButton>
				<Divider />
				<List>
					<ListItem disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}>
								<Book />
							</ListItemIcon>
							<ListItemText
								primary='Estación 1'
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
};

export default Sidebar;

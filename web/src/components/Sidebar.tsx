import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Tooltip,
} from '@mui/material';
import { DrawerProps } from '../propTypes/Appbar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const Sidebar = ({ menuArray, open, setOpen }: DrawerProps) => {
	const navigate = useNavigate();
	return (
		<>
			<Drawer
				variant='permanent'
				open={open}
				sx={{
					width: { xs: 50, md: drawerWidth },
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: { xs: 50, md: drawerWidth },
						boxSizing: 'border-box',
					},
				}}>
				<Toolbar />
				<Divider />
				<List>
					{menuArray.map((item, index) => (
						<ListItem
							key={index}
							disablePadding
							sx={{ display: 'block' }}>
							<Tooltip title={item.description}>
								<ListItemButton
									onClick={() => navigate(item.path)}
									sx={{
										minHeight: 48,
										justifyContent: {
											xs: 'center',
											md: 'initial',
										},
										px: 4,
										gap: 2,
									}}>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
											color: 'inherit',
										}}>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.text}
										sx={{
											opacity: { xs: 0, md: 1 },
										}}
									/>
								</ListItemButton>
							</Tooltip>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};

export default Sidebar;

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
import { DrawerProps } from '../../propTypes/Appbar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = '200px';

const Sidebar = ({ menuArray, open, setOpen }: DrawerProps) => {
	const navigate = useNavigate();
	return (
		<>
			<Drawer
				variant='permanent'
				open={open}
				sx={{
					width: { xs: '50px', md: drawerWidth },
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: { xs: '50px', md: drawerWidth },
						boxSizing: 'border-box',
					},
					scrollbarWidth: 'none' /* Firefox */,
					'&::-webkit-scrollbar': {
						display: 'none',
					} /* Chrome */,
				}}>
				<Toolbar />
				<Divider />
				<List>
					{menuArray.map((item, index) => (
						<ListItem
							key={index}
							disablePadding
							sx={{
								display: 'block',
							}}>
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
									<Tooltip title={item.description}>
										{item.icon}
									</Tooltip>
								</ListItemIcon>
								<ListItemText
									primary={item.text}
									sx={{
										opacity: { xs: 0, md: 1 },
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};

export default Sidebar;

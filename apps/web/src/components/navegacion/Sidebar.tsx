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
	Typography,
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
					width: { xs: 60, md: drawerWidth },
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: { xs: 60, md: drawerWidth },
						boxSizing: 'border-box',
					},
				}}>
				<Toolbar />
				<Divider />
				<List>
					{menuArray
						.sort((a, b) => a.indice - b.indice)
						.map((item, index) => (
							<ListItem
								key={index}
								disablePadding
								sx={{
									display: 'block',
								}}>
								<ListItemButton
									onClick={() => navigate(item.ruta)}
									sx={{
										minHeight: 48,
										justifyContent: {
											xs: 'center',
											md: 'initial',
										},
										overflow: 'hidden',
										scrollbarWidth: 'none' /* Firefox */,
										'&::-webkit-scrollbar': {
											display: 'none',
										} /* Chrome */,
										px: 4,
										gap: 2,
									}}>
									<Tooltip title={item.descripcion}>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
												color: 'inherit',
											}}>
											<Typography variant='caption'>
												{item.icono ||
													item.nombre.slice(0, 3)}
											</Typography>
										</ListItemIcon>
									</Tooltip>
									<ListItemText
										primary={item.nombre}
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

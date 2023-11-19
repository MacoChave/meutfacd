import { PageAppType } from '@/models/PageApp';
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
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export type SidebarProps = {
	menuArray: PageAppType[];
	open: boolean;
	setOpen: (open: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ menuArray, open, setOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleSelectItem = (ruta: string) => {
		navigate(ruta);
		// setOpen(false);
	};

	return (
		<Drawer
			variant='persistent'
			anchor='left'
			open={open}
			// onClose={() => setOpen(false)}
			// ModalProps={{
			// 	keepMounted: true, // Better open performance on mobile.
			// }}
			sx={{
				gridArea: 'sidebar',
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					width: drawerWidth,
				},
			}}>
			<Toolbar />
			<Divider />
			<List
				sx={{
					'&& .Mui-selected': {
						background:
							'linear-gradient(90deg, transparent 0%, #c62828 100%)',
						'& .MuiListItemIcon-root': {
							color: 'white',
						},
						'& .MuiListItemText-root': {
							color: 'white',
						},
					},
				}}>
				{menuArray
					.sort((a, b) => a.indice - b.indice)
					.map((item, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton
								selected={
									location.pathname.split('/').pop() ===
									item.ruta
								}
								onClick={() => handleSelectItem(item.ruta)}>
								<Tooltip title={item.descripcion}>
									<ListItemIcon
										sx={{
											color: 'inherit',
										}}>
										<Typography variant='caption'>
											{item.icono ||
												item.nombre.slice(0, 3)}
										</Typography>
									</ListItemIcon>
								</Tooltip>
								<ListItemText primary={item.nombre} />
							</ListItemButton>
						</ListItem>
					))}
			</List>
		</Drawer>
	);
};

export default Sidebar;

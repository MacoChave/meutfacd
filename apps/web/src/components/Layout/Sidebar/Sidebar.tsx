import { TPageApp } from '@/models/PageApp';
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Toolbar,
	Typography,
} from '@mui/material';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import derechoLogo from '@/assets/svg/logo_derecho_white.svg';

const drawerWidth = 200;

export type SidebarProps = {
	menuArray: TPageApp[];
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
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					width: drawerWidth,
				},
			}}>
			<Toolbar />
			<Divider />
			<Box p={2} textAlign={'center'}>
				<img
					src={derechoLogo}
					style={{
						height: '3rem',
						marginRight: '1em',
					}}
					alt='Facultad de Ciencias Jurídicas y Sociales'
					loading='lazy'
				/>
				<Box textAlign={'center'}>
					<Typography variant='h4'>SIDER</Typography>
					<Typography variant='body2'>
						Sistema Informático de Derecho
					</Typography>
				</Box>
			</Box>
			{Object.entries(menuArray).map(
				([key, value]: any, index: number) => (
					<List
						component={'nav'}
						aria-labelledby={key}
						key={key.toString().replace(' ', '-')}
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
						}}
						subheader={
							<ListSubheader
								sx={{
									fontWeight: 'bold',
									position: 'sticky',
									top: 65,
								}}
								component={'div'}>
								{key}
							</ListSubheader>
						}>
						{value.map((item: any, index: number) => (
							<ListItemButton
								key={index}
								selected={location.pathname === item.ruta}
								onClick={() => handleSelectItem(item.ruta)}>
								<ListItemText primary={item.n_hijo} />
							</ListItemButton>
						))}
					</List>
				)
			)}
		</Drawer>
	);
};

export default Sidebar;

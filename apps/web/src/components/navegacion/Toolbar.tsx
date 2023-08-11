import { URL } from '@/api/server';
import { useFetch } from '@/hooks/useFetch';
import { setLogout } from '@/redux/states';
import { AccountCircle, Menu, Notifications } from '@mui/icons-material';
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Toolbar.css';

interface ToolbarProps {
	children?: React.ReactNode;
}

export const ToolbarWithoutSesion = ({ children }: ToolbarProps) => {
	return (
		<AppBar
			// position='fixed'
			color='primary'
			sx={{
				gridArea: 'header',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}>
			<Toolbar>
				<IconButton
					color='inherit'
					sx={{ mr: 2, display: { sm: 'none' } }}>
					<Menu />
				</IconButton>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1, display: { sx: 'none', sm: 'block' } }}>
					Unidad de tesis
				</Typography>
				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					{children}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export const ToolbarWithSesion = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data, isLoading, isError } = useFetch({
		url: `${URL.MESSAGING}/all`,
		params: { activo: 1 },
	});

	const handleLogout = (_: MouseEvent) => {
		dispatch(setLogout());
		navigate('/', { replace: true });
	};

	const handleProfile = (_: MouseEvent) => {
		navigate('perfil');
	};

	const openMessages = () => {
		data.forEach((msg: any) => {
			toast(msg.mensaje, {
				position: toast.POSITION.BOTTOM_LEFT,
				className: 'toast-message',
			});
		});
	};

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<ToolbarWithoutSesion>
				<IconButton color='inherit' onClick={openMessages}>
					<Badge badgeContent={data?.length ?? 0} color='info'>
						<Notifications />
					</Badge>
				</IconButton>
				<IconButton onClick={handleProfile} color='inherit'>
					<AccountCircle />
				</IconButton>
				<Button onClick={handleLogout} color='inherit'>
					Cerrar sesión
				</Button>
			</ToolbarWithoutSesion>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					right: 0,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}>
				<ToastContainer />
			</Box>
		</>
	);
};

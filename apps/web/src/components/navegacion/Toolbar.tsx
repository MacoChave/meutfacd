import { URL } from '@/api/server';
import derechoLogo from '@/assets/svg/derechoLogo.svg';
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
import './Toolbar.css';
import { NotificationType } from '@/models/Notification';
import { useSnackbar } from 'notistack';
import { putData } from '@/services/fetching';
import { DotsLoaders } from '../Loader/DotsLoaders';

interface ToolbarProps {
	children?: React.ReactNode;
}

export const ToolbarWithoutSesion = ({ children }: ToolbarProps) => {
	const navigate = useNavigate();

	const goToHome = () => {
		navigate('/');
	};

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
				<img
					src={derechoLogo}
					style={{
						height: '3rem',
						marginRight: '1em',
					}}
					alt='Facultad de Ciencias Jurídicas y Sociales'
				/>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1, display: { sx: 'none', sm: 'block' } }}
					onClick={() => goToHome()}>
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
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const { data, isLoading, isError, refetch } = useFetch({
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
		data.forEach((message: NotificationType) => {
			enqueueSnackbar(message.mensaje, {
				variant: 'info',
				onClose: async () => {
					await putData({
						path: URL.MESSAGING,
						body: { activo: 0 },
						params: { id_notificacion: message.id_notificacion },
					});
					refetch();
					closeSnackbar();
				},
			});
		});
	};

	if (isLoading) return <DotsLoaders />;
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
		</>
	);
};

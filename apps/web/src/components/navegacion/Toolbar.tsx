import { URL } from '@/api/server';
import derechoLogo from '@/assets/svg/logo_derecho_white.svg';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { setLogout } from '@/redux/states';
import {
	AccountCircle,
	ExitToApp,
	Menu,
	Message,
	Notifications,
} from '@mui/icons-material';
import {
	AppBar,
	Avatar,
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
import { getColorAvatar, getInitialsFullname } from '@/utils/formatHandler';
import store from '@/redux/store';

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
			<Toolbar
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}>
				<IconButton color='inherit' sx={{ mr: 2 }}>
					<Menu />
				</IconButton>
				<img
					src={derechoLogo}
					style={{
						height: '3rem',
						marginRight: '1em',
					}}
					alt='Facultad de Ciencias Jurídicas y Sociales'
					loading='lazy'
				/>
				<Typography
					component='div'
					sx={{
						cursor: 'pointer',
						display: { xs: 'none', sm: 'block' },
					}}
					onClick={() => goToHome()}>
					Unidad de tesis
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: { xs: 'block', sm: 'block' } }}>
					{children}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export const ToolbarWithSesion = () => {
	const { auth } = store.getState().control;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const {
		data: messages,
		isLoading: isLoadMessages,
		isError: isErrorMessages,
		refetch: refetchMessages,
	} = useFetch({
		url: `${URL.NOTIFICATION}/all`,
		params: { activo: 1 },
	});

	// GET MESSAGES
	const {
		data: chats,
		isLoading: isLoadChats,
		isError: isErrorChats,
	} = useCustomFetch({
		url: `${URL.CHAT}`,
		method: 'get',
	});

	const handleLogout = (_: MouseEvent) => {
		dispatch(setLogout());
		navigate('/', { replace: true });
	};

	const handleProfile = (_: MouseEvent) => {
		navigate('perfil');
	};

	const handleChat = (_: MouseEvent) => {
		navigate('chat');
	};

	const openMessages = () => {
		messages.forEach((message: NotificationType) => {
			enqueueSnackbar(message.mensaje, {
				variant: 'info',
				onClose: async () => {
					await putData({
						path: URL.NOTIFICATION,
						body: { activo: 0 },
						params: { id_notificacion: message.id_notificacion },
					});
					refetchMessages();
					closeSnackbar();
				},
				autoHideDuration: 5000,
			});
		});
	};

	const stringAvatar = () => {
		let initials: string = auth.name;
		return {
			sx: {
				bgcolor: getColorAvatar(initials),
			},
			children: getInitialsFullname(initials),
		};
	};

	if (isLoadMessages) return <DotsLoaders />;
	if (isErrorMessages) return <Typography>Error</Typography>;

	return (
		<>
			<ToolbarWithoutSesion>
				<IconButton
					onClick={handleChat}
					color='inherit'
					title='Mis mensajes'>
					<Badge badgeContent={chats?.length ?? 0} color='info'>
						<Message />
					</Badge>
				</IconButton>
				<IconButton
					onClick={openMessages}
					color='inherit'
					title='Mis notificaciones'>
					<Badge badgeContent={messages?.length ?? 0} color='info'>
						<Notifications />
					</Badge>
				</IconButton>
				<IconButton
					onClick={handleLogout}
					color='inherit'
					title='Cerrar sesión'>
					<ExitToApp />
				</IconButton>
				<IconButton
					onClick={handleProfile}
					color='inherit'
					title='Mi perfil'>
					<Avatar {...stringAvatar()} />
				</IconButton>
			</ToolbarWithoutSesion>
		</>
	);
};

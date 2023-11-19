import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { NotificationType } from '@/models/Notification';
import { setLogout } from '@/redux/states';
import store from '@/redux/store';
import { putData } from '@/services/fetching';
import { getColorAvatar, getInitialsFullname } from '@/utils/formatHandler';
import { ExitToApp, Menu, Message, Notifications } from '@mui/icons-material';
import { Avatar, Badge, IconButton, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ToolbarWithoutSesion = lazy(
	() => import('../ToolbarWithoutSession/ToolbarWithoutSession')
);

export type ToolbarWithSessionProps = {
	handleToogleMenu: () => void;
};

const ToolbarWithSession: React.FC<ToolbarWithSessionProps> = ({
	handleToogleMenu,
}) => {
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

	const handleLogout = () => {
		dispatch(setLogout());
		navigate('/', { replace: true });
	};

	const handleProfile = () => {
		navigate('perfil');
	};

	const handleChat = () => {
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
		<ToolbarWithoutSesion>
			<IconButton
				color='inherit'
				sx={{
					order: -1,
					mr: 2,
				}}
				onClick={handleToogleMenu}>
				<Menu />
			</IconButton>
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
	);
};

export default ToolbarWithSession;

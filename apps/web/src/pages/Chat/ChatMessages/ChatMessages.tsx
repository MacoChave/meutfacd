import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { TChat } from '@/models/Chat';
import { TMessage } from '@/models/Message';
import store from '@/redux/store';
import { postData } from '@/services/fetching';
import { formatDate } from '@/utils/formatHandler';
import { Autorenew, Send } from '@mui/icons-material';
import {
	Box,
	Card,
	IconButton,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import { FC, KeyboardEvent, useState } from 'react';

export type ChatMessagesProps = {
	currentChat: TChat | null;
};

const ChatMessages: FC<ChatMessagesProps> = ({ currentChat }) => {
	const { auth } = store.getState().control;
	const [text, setText] = useState('');
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: URL.MESSAGE,
		method: 'get',
		params: { id_chat: currentChat?.id_chat },
	});

	const sendMessage = async () => {
		await postData({
			path: URL.MESSAGE,
			body: {
				id_chat: currentChat?.id_chat,
				texto: text,
			},
		});
		setText('');
		refetch();
	};

	const reloadMessages = () => {
		refetch();
	};

	const getStyleChat = (from: string) => {
		if (from === auth.name)
			return {
				textAlign: 'right',
				bgcolor: 'primary.light',
				ml: 'auto',
				mr: 0,
				borderRadius: '12px 12px 0 12px',
			};
		return {
			textAlign: 'left',
			bgcolor: 'secondary.light',
			ml: 0,
			mr: 'auto',
			borderRadius: '12px 12px 12px 0',
		};
	};

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return <Typography>No se pudieron obtener los mensajes</Typography>;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				gap: 2,
				maxHeight: '50vh',
			}}>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					overflowY: 'auto',
					flex: 1,
				}}>
				{data.map((message: TMessage) => (
					<ListItem key={message.id_message}>
						<ListItemText
							sx={{
								...getStyleChat(message.nombre),
								wordBreak: 'break-word',
								maxWidth: '50%',
								color: 'white',
								p: 1,
								'&.MuiListItemText-primary': {
									color: 'white',
								},
								'&.MuiListItemText-secondary': {
									color: 'white',
								},
								'&.MuiListItemText-root': {
									maxWidth: 'fit-content',
								},
							}}
							title={message.nombre}
							primary={message.texto}
							secondary={formatDate({
								date: new Date(message.fecha_envio),
								withTime: true,
								onlyMonth: true,
							})}
						/>
					</ListItem>
				))}
			</Card>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					gap: 1,
				}}>
				<IconButton
					color='info'
					title='Refrescar mensajes'
					onClick={reloadMessages}>
					<Autorenew />
				</IconButton>
				<TextField
					sx={{ flexGrow: 1 }}
					variant='standard'
					placeholder='Escribe un mensaje'
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
						if (e.key === 'Enter') sendMessage();
					}}
				/>
				<IconButton
					color='primary'
					title='Enviar mensaje'
					onClick={sendMessage}>
					<Send />
				</IconButton>
			</Card>
		</Box>
	);
};

export default ChatMessages;

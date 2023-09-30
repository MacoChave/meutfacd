import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { TChat } from '@/models/Chat';
import { TMessage } from '@/models/Message';
import { ResultType } from '@/models/Result';
import { postData } from '@/services/fetching';
import { formatDate } from '@/utils/formatHandler';
import { Autorenew, Send } from '@mui/icons-material';
import {
	Box,
	Card,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import { FC, useState } from 'react';

export type ChatMessagesProps = {
	currentChat: TChat | null;
};

const ChatMessages: FC<ChatMessagesProps> = ({ currentChat }) => {
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
							title={formatDate({
								date: new Date(message.fecha_envio),
							})}
							primary={message.texto}
							secondary={message.nombre}
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

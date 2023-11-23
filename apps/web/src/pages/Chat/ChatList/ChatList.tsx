import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { TChat } from '@/models/Chat';
import { formatDate } from '@/utils/formatHandler';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import { Dispatch, FC } from 'react';

export type ChatListProps = {
	setCurrentChat: Dispatch<React.SetStateAction<TChat | null>>;
};

const ChatList: FC<ChatListProps> = ({ setCurrentChat }) => {
	const {
		data: chats,
		isLoading: isLoadChats,
		isError: isErrorChats,
	} = useCustomFetch({
		url: `${URL.CHAT}`,
		method: 'get',
	});

	const openChat = (chat: TChat) => {
		setCurrentChat(chat);
	};

	if (isLoadChats) return <DotsLoaders />;
	if (isErrorChats)
		return <Typography>No se pudo obtener los chats</Typography>;

	return (
		<List>
			{chats.map((chat: TChat) => (
				<ListItem key={chat.id_chat}>
					<ListItemButton onClick={() => openChat(chat)} dense>
						<ListItemText
							primary={`${chat.n1} > ${chat.n2}`}
							secondary={formatDate({
								date: new Date(chat.fecha_creacion),
							})}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};

export default ChatList;

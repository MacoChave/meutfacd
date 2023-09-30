import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { TChat } from '@/models/Chat';
import { formatDate } from '@/utils/formatHandler';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ChatList } from './ChatList';
import { ChatMessages } from './ChatMessages';

export type ChatProps = {};

const Chat: React.FC<ChatProps> = ({}) => {
	const [currentChat, setCurrentChat] = useState<TChat | null>(null);
	const {
		data: chats,
		isLoading: isLoadChats,
		isError: isErrorChats,
	} = useCustomFetch({
		url: `${URL.CHAT}`,
		method: 'get',
	});

	if (isLoadChats) return <DotsLoaders />;
	if (isErrorChats)
		return <Typography>No se pudo obtener los chats</Typography>;

	return (
		<>
			<Contenedor title='Conversaciones'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: '50vh',
						flexWrap: 'wrap',
						gap: 2,
					}}>
					<Box
						sx={{
							width: 300,
						}}>
						<ChatList setCurrentChat={setCurrentChat} />
					</Box>
					<Box sx={{ flex: 1 }}>
						<ChatMessages currentChat={currentChat} />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Chat;

import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { TChat } from '@/models/Chat';
import { Box, Card, Typography } from '@mui/material';
import React, { lazy, useState } from 'react';
import { ChatList } from './ChatList';
const ChatMessages = lazy(() => import('./ChatMessages/ChatMessages'));

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
					<Card
						sx={{
							width: 300,
						}}>
						<ChatList setCurrentChat={setCurrentChat} />
					</Card>
					<Card sx={{ flex: 1 }}>
						{currentChat && (
							<ChatMessages currentChat={currentChat} />
						)}
					</Card>
				</Box>
			</Contenedor>
		</>
	);
};

export default Chat;

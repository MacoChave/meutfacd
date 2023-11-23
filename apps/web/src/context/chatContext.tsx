import { URL } from '@/consts/Api';
import { useCustomFetch } from '@/hooks/useFetch';
import { createContext, useEffect, useState } from 'react';

export const ChatContext = createContext({});

export const ChatContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const {
		data: userChat,
		isLoading,
		isError,
	} = useCustomFetch({
		url: `${URL.CHAT}`,
		method: 'get',
	});

	return (
		<ChatContext.Provider
			value={{
				userChat,
				isLoading,
				isError,
			}}>
			{children}
		</ChatContext.Provider>
	);
};

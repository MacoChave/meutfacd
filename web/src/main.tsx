import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import { AuthProvider } from './contexts/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>
);

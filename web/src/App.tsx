// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import { AuthProvider } from './contexts/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<AuthProvider>
						<RouterProvider router={router} />
					</AuthProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;

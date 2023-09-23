// import './App.css'
import derechoLogo from '@/assets/svg/logo_derecho_primaycolor.svg';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { DotsLoaders } from './components/Loader/DotsLoaders';
import queryClient from './queryClient';
import store from './redux/store';
import { router } from './routes/Router';
import { theme } from './themes/theme';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<SnackbarProvider>
						<ThemeProvider theme={theme}>
							<Suspense
								fallback={
									<Box
										sx={{
											position: 'absolute',
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 4,
										}}>
										<img
											style={{
												height: '30vh',
											}}
											src={derechoLogo}
											alt='Derecho logo'
										/>
										<Typography variant='h4' align='center'>
											Espere un momento
										</Typography>
										<DotsLoaders />
									</Box>
								}>
								<RouterProvider
									router={router}
									fallbackElement={
										<div>
											<h1>404</h1>
											<p>Page not found</p>
										</div>
									}
								/>
							</Suspense>
						</ThemeProvider>
					</SnackbarProvider>
				</Provider>
			</QueryClientProvider>
		</>
	);
}

export default App;

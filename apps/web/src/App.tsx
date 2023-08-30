// import reactLogo from './assets/react.svg'
// import './App.css'
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import queryClient from './queryClient';
import store from './redux/store';
import { router } from './routes/Router';
import { theme } from './themes/theme';
import { SnackbarProvider } from 'notistack';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<SnackbarProvider>
						<ThemeProvider theme={theme}>
							<RouterProvider
								router={router}
								fallbackElement={
									<div>
										<h1>404</h1>
										<p>Page not found</p>
									</div>
								}
							/>
						</ThemeProvider>
					</SnackbarProvider>
				</Provider>
			</QueryClientProvider>
		</>
	);
}

export default App;

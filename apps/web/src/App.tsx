// import reactLogo from './assets/react.svg'
// import './App.css'
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import queryClient from './queryClient';
import { router } from './routes/Router';
import { theme } from './themes/theme';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
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
				</Provider>
			</QueryClientProvider>
		</>
	);
}

export default App;

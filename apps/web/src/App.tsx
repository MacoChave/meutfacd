// import reactLogo from './assets/react.svg'
// import './App.css'
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import Rutas from './routes/Router';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Rutas />
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;

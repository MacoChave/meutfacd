// import reactLogo from './assets/react.svg'
// import './App.css'
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logup from './pages/Logup';
import Recovery from './pages/Recovery';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/logup' element={<Logup />} />
							<Route path='/recovery' element={<Recovery />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;

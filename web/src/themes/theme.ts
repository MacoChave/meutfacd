import { createTheme } from '@mui/material';

export const theme = createTheme({
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: '#00225B',
					color: '#fff',
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#00225B',
			light: '#2E72D0',
			dark: '#2E72D0',
		},
		secondary: {
			main: '#FFC107',
			light: '#FFC107',
			dark: '#FFC107',
		},
	},
});

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
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: '#00225B',
					color: '#fff',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					fontWeight: 'bold',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontWeight: 'inherit',
					textAlign: 'center',
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

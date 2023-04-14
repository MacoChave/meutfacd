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
			main: '#1a237e',
			light: '#534bae',
			dark: '#000051',
		},
		secondary: {
			main: '#c62828',
			light: '#ff5f52',
			dark: '#8e0000',
		},
		neutral: {
			main: '#64748b',
			contrastText: '#fff',
		},
	},
});

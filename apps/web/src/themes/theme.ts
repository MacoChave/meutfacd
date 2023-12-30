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
		MuiToggleButton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					border: 'none',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(255, 255, 255, 0.75)',
					backdropFilter: 'blur(4px)',
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#1a237e',
			light: '#767bb2',
			dark: '#10154c',
		},
		secondary: {
			main: '#c62828',
			light: '#dd7e7e',
			dark: '#771818',
		},
		info: {
			main: '#2196f3',
			light: '#7ac0f8',
			dark: '#145a92',
		},
		neutral: {
			main: '#64748b',
			contrastText: '#fff',
		},
	},
});

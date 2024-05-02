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
					backdropFilter: 'blur(6px)',
				},
			},
		},
	},
	// LIGH MODE
	// --primary-100:#005CBF;
	// --primary-200:#5988f2;
	// --primary-300:#c7eaff;
	// --accent-100:#FF0000;
	// --accent-200:#ffc993;
	// --text-100:#000000;
	// --text-200:#2c2c2c;
	// --bg-100:#FFFFFF;
	// --bg-200:#f5f5f5;
	// --bg-300:#cccccc;
	// DARK MODE
	// --primary-100:#0000ff;
	// --primary-200:#7142ff;
	// --primary-300:#eea6ff;
	// --accent-100:#ff0000;
	// --accent-200:#ffc993;
	// --text-100:#ffffff;
	// --text-200:#e0e0e0;
	// --bg-100:#1A1A1A;
	// --bg-200:#292929;
	// --bg-300:#404040;

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

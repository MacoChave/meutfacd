import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		neutral: Palette;
	}
	interface PaletteOptions {
		neutral: PaletteColorOptions;
	}
}

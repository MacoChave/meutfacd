import { PageAppType } from '@/models/PageApp';

export interface AppbarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export interface MenuItem {
	nombre: string;
	description: string;
	icon: JSX.Element;
	ruta: string;
}

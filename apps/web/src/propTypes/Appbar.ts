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

export interface DrawerProps {
	menuArray: MenuItem[];
	open: boolean;
	setOpen: (open: boolean) => void;
}

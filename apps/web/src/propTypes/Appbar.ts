export interface AppbarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export interface MenuItem {
	text: string;
	description: string;
	icon: JSX.Element;
	path: string;
}

export interface DrawerProps {
	menuArray: MenuItem[];
	open: boolean;
	setOpen: (open: boolean) => void;
}

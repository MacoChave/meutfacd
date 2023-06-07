export interface ModalProps {
	children: React.ReactNode;
	open: boolean;
	title: string;
	setOpen: (open: boolean) => void;
}

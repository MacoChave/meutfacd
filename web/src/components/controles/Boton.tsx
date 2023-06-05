import { Button, IconButton } from '@mui/material';
import { SyntheticEvent } from 'react';

interface ButtonProps {
	children: React.ReactNode;
	handleClick: (event: SyntheticEvent) => void;
}

export const Boton = ({ children }: ButtonProps) => {
	return <Button>{children}</Button>;
};

export const BotonPrimario = ({ children, handleClick }: ButtonProps) => {
	return (
		<Button variant='contained' color='primary' onClick={handleClick}>
			{children}
		</Button>
	);
};

export const BotonSecundario = ({ children }: ButtonProps) => {
	return (
		<Button variant='outlined' color='secondary'>
			{children}
		</Button>
	);
};

export const BotonTexto = ({ children }: ButtonProps) => {
	return (
		<Button variant='text' color='primary'>
			{children}
		</Button>
	);
};

export const BotonIcono = ({ children }: ButtonProps) => {
	return <IconButton>{children}</IconButton>;
};

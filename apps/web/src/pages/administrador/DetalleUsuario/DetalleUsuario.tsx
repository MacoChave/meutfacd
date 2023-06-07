import { Tipo_Usuario } from '@/models/Perfil';
import { Edit } from '@mui/icons-material';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Informacion } from './Informacion';
import { Rol } from './Rol';
import { Logs } from './Logs';

export type DetalleUsuarioProps = {
	registro: Tipo_Usuario;
};

const allyProps = (index: any) => {
	return {
		id: `detalle-usuariopanel-${index}`,
		'aria-controls': `detalle-usuariopanel-${index}`,
	};
};

const DetalleUsuario: React.FC<DetalleUsuarioProps> = ({ registro }) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Box sx={{ display: 'flex' }}>
				<Typography sx={{ flex: 1 }}>
					{registro.correo || 'usuario@compania.com'}
				</Typography>
				<Button variant='text' color='secondary' startIcon={<Edit />}>
					Editar
				</Button>
			</Box>
			<Box>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs detalle usuario'>
					<Tab label='Información' {...allyProps(0)} />
					<Tab label='Rol' {...allyProps(1)} />
					<Tab label='Logs' {...allyProps(2)} />
				</Tabs>
			</Box>
			{value === 0 ? (
				<Informacion usuario={registro} value={value} index={0} />
			) : value === 1 ? (
				<Rol usuario={registro} value={value} index={1} />
			) : (
				<Logs usuario={registro} value={value} index={2} />
			)}
		</Box>
	);
};

export default DetalleUsuario;

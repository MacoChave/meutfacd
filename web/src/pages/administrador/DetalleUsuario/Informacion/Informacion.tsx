import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { TabsProps } from '../models/tabsProps';

const Informacion: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	console.log('> Informacion.tsx: InformacionProps: usuario: ', usuario);
	return (
		<div
			role='tabpanel'
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 3,
				}}>
				<Typography>Datos personales</Typography>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 2,
					}}>
					<TextField
						variant='outlined'
						label='Nombres'
						value={usuario.nombre}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						variant='outlined'
						label='Apellidos'
						value={usuario.apellido}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						variant='outlined'
						label='Género'
						value={usuario.genero}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						variant='outlined'
						label='Fecha de nacimiento'
						value={usuario.fecha_nac}
						type='date'
						InputProps={{ readOnly: true }}
					/>
				</Box>
				<Typography>Datos de contacto</Typography>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 2,
					}}>
					<TextField
						variant='outlined'
						label='Teléfono'
						value={usuario.telefono}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						variant='outlined'
						label='Registro universitario'
						value={usuario.carnet}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						variant='outlined'
						label='CUI'
						value={usuario.cui}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						variant='outlined'
						label='Dirección'
						value={usuario.direccion}
						InputProps={{ readOnly: true }}
					/>
				</Box>
			</Box>
		</div>
	);
};

export default Informacion;

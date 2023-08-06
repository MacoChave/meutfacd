import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { TabsProps } from '../../propTypes/tabsProps';

const Informacion: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { xs: '150px', sm: '300px', md: '400px' },
					gap: 2,
					p: 3,
				}}>
				<Typography>Datos personales</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(150px, 1fr))',
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
						value={usuario.apellidos}
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
						value={new Date(usuario.fecha_nac).toLocaleDateString()}
						InputProps={{ readOnly: true }}
					/>
				</Box>
				<Typography>Datos de contacto</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(150px, 1fr))',
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
		</>
	);
};

export default Informacion;

import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import Contenedor from '../components/Card';

const Profile = () => {
	return (
		<>
			<Contenedor title='Perfil de usuario'>
				<Box
					component='article'
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: 4,
					}}>
					<Box
						component='section'
						sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
						<Box component='header' sx={{ flex: 1 }}>
							<Typography variant='h6'>
								Datos personales
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
							}}>
							<TextField label='Nombres' value='Maricruz' />
							<TextField
								label='Apellidos'
								value='Silva Sacristán'
							/>
							<TextField label='Género' value='Femenino' />
							<TextField
								type='date'
								label='Fecha de nacimiento'
								value='1995-08-06'
							/>
						</Box>
					</Box>
					<Divider />
					<Box
						component='section'
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 4,
						}}>
						<Box component='header' sx={{ flex: 1 }}>
							<Typography variant='h6'>
								Datos de contacto
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
							}}>
							<TextField label='Teléfono' value='72072160' />
							<TextField label='Carnet' value='20145296' />
							<TextField label='CUI' value='16062246193' />
							<TextField
								label='Dirección'
								value='2789 Vidon Way'
							/>
							<TextField label='Jornada' value='Vespertina' />
							<TextField label='Horario' value='13:00 - 14:00' />
						</Box>
					</Box>
					<Divider />
					<Box
						component='section'
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 4,
						}}>
						<Box component='header' sx={{ flex: 1 }}>
							<Typography variant='h6'>
								Datos de sesión
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
							}}>
							<TextField
								label='Correo'
								value='maricruzsilva@gmail.com'
							/>
							<TextField
								type='password'
								label='Contraseña'
								value=''
							/>
							<TextField
								type='password'
								label='Confirmar contraseña'
								value=''
							/>
						</Box>
					</Box>
					<Divider />
				</Box>
				<Button variant='contained'>Guardar</Button>
			</Contenedor>
		</>
	);
};

export default Profile;

import { Contenedor, McModal } from '@/components';
import { URL } from '@/consts/Api';
import { TResponse } from '@/models/Fetching';
import { TUser } from '@/models/Perfil';
import { deleteData } from '@/services/fetching';
import { Add, Clear, Search } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FetchUsers = lazy(() => import('./components/FetchUsers/FetchUsers'));
const NewUser = lazy(() => import('./NewUser/NewUser'));

const Usuarios = () => {
	const [filter, setFilter] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();

	const onEdit = (registro: object) => {
		const usuario: TUser = registro as TUser;
		navigate('detail', { state: { usuario } });
	};

	const onSwitchActive = async (registro: any) => {
		let action = registro.deletedAt ? 'R' : 'D';

		const response: TResponse<any> = await deleteData({
			path: `${URL.USER}/`,
			query: [action, registro.id_usuario],
		});

		if (response.code === 200) {
			swal({
				icon: 'success',
				title: 'Edición de usuario',
				text: response.message,
				timer: 3000,
			});
		} else {
			swal({
				icon: 'error',
				title: 'Edición de usuario',
				text: response.message,
				timer: 3000,
			});
		}
	};

	const onClose = () => {
		setOpenModal(false);
	};

	return (
		<>
			<Contenedor title='Gestión de usuarios'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'baseline',
						gap: 2,
					}}>
					<TextField
						sx={{ flex: 1 }}
						label='Filtrar por nombre, apellido o correo electrónico'
						variant='standard'
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						InputProps={{
							startAdornment: <Search color='primary' />,
							endAdornment: (
								<IconButton onClick={() => setFilter('')}>
									<Clear />
								</IconButton>
							),
						}}
					/>
					<IconButton
						onClick={() => {
							setOpenModal(true);
						}}
						color='primary'
						aria-label='Agregar usuario'
						title='Agregar usuario/s'>
						<Add />
					</IconButton>
				</Box>
				<FetchUsers
					filter={filter}
					onEdit={onEdit}
					onDelete={onSwitchActive}
				/>
			</Contenedor>
			{openModal && (
				<McModal
					title='Crear uno o varios usuarios'
					open={openModal}
					onClose={onClose}>
					<NewUser onClose={onClose} />
				</McModal>
			)}
		</>
	);
};

export default Usuarios;

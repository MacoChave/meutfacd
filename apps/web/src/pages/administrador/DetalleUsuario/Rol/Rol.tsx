import { URL } from '@/api/server';
import { useCustomFetch } from '@/hooks/useFetch';
import {
	Autocomplete,
	Box,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { TabsProps } from '../propTypes/tabsProps';
import { RolType, defaultRol } from '@/models/Rol';
import { postData, putData } from '@/services/fetching';

const Rol: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	const {
		data: userRol,
		isLoading: isUserLoading,
		isError: isUserError,
	} = useCustomFetch({
		url: `${URL.GENERIC}/one`,
		method: 'post',
		body: {
			table: 'ut_v_rol',
		},
		params: { id_usuario: usuario.id_usuario },
	});
	const {
		data: roles,
		isLoading: isRolLoading,
		isError: isRolError,
	} = useCustomFetch({
		url: `${URL.GENERIC}`,
		method: 'post',
		body: {
			table: 'rol',
		},
	});
	const [value, setValue] = useState<RolType>(defaultRol);
	const [inputValue, setInputValue] = useState('');
	const [editing, setEditing] = useState(false);

	const onSave = async () => {
		const response = await putData({
			path: URL.USER_ROL,
			body: {
				id_rol: value.id_rol,
			},
			params: {
				id_usuario: usuario.id_usuario,
			},
		});
	};

	const handleClic = () => {
		if (editing) {
			onSave();
		}
		setEditing(!editing);
	};

	if (isUserLoading) return <div>Loading...</div>;
	if (isUserError) return <div>Error</div>;

	if (isRolLoading) return <div>Loading...</div>;
	if (isRolError) return <div>Error</div>;

	return (
		<div
			role='tabpanel'
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '2fr 1fr',
					gap: 2,
					p: 2,
				}}>
				<Typography>{userRol.r_nombre}</Typography>
				<Button
					variant='contained'
					color='primary'
					onClick={handleClic}>
					{!editing ? 'Editar' : 'Guardar'}
				</Button>
				{editing && (
					<Autocomplete
						sx={{ gridColumnEnd: 'span 2' }}
						options={roles}
						value={value}
						onChange={(_event: any, newValue: any) => {
							setValue(newValue);
						}}
						inputValue={inputValue}
						onInputChange={(_event, newInputValue) => {
							setInputValue(newInputValue);
						}}
						getOptionLabel={(option: any) => option.nombre}
						renderInput={(params: any) => (
							<TextField {...params} label='Rol' />
						)}
					/>
				)}
			</Box>
		</div>
	);
};

export default Rol;

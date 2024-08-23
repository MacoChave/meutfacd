import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';
import { Option } from '@/components/McWithForms/McAutocomplete/McAutocomplete';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import { TRol, defaultRol } from '@/models/Rol';
import { deleteData, postData } from '@/services/fetching';
import { Delete } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { TabsProps } from '../../propTypes/tabsProps';

const Rol: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	const [rootRol, setRootRol] = useState();

	const {
		data: vRol,
		isLoading: isLoadvRol,
		isError: isErrvRol,
		refetch,
	} = useFetch({
		url: `${URL.USER}/${usuario.id_usuario}`,
	});
	const {
		data: rols,
		isLoading: isLoadingRols,
		isError: isErrRols,
	} = useFetch({
		url: `${URL.ROL}/all`,
	});

	const { control, handleSubmit } = useForm<TRol>({
		defaultValues: defaultRol,
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<TRol> = async (data) => {
		const result = await postData({
			path: `${URL.USER_ROL}`,
			body: { id_usuario: usuario.id_usuario, id_rol: data.id_rol },
		});
		if (result) {
			swal('¡Rol agregado!', '', 'success');
			refetch();
		}
	};

	const onDelete = async (data: any) => {
		const result = await deleteData({
			path: `${URL.USER_ROL}`,
			params: { id_usuario: usuario.id_usuario, id_rol: data.id_rol },
		});
		if (result) {
			swal('¡Rol eliminado!', '', 'success');
			refetch();
		}
	};

	const onChangeRootRol = (rol: any) => {
		setRootRol(rol);
	};

	if (isLoadvRol || isLoadingRols)
		return <Typography>Cargando...</Typography>;
	if (isErrvRol || isErrRols) return <Typography>Error...</Typography>;

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
				<Typography variant='h6'>Editar rol de usuario</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: 'grid',
							gap: 2,
							gridTemplateColumns:
								'repeat(auto-fit, minmax(100px, 1fr))',
						}}>
						<McAutocomplete
							control={control as any}
							name='id_rol'
							label='Seleccionar rol'
							options={(rols?.message?.data ?? []).map(
								(rol: TRol): Option => ({
									id: rol.id_rol,
									label: rol.nombre,
								})
							)}
						/>
						<Button variant='contained' type='submit'>
							Agregar rol
						</Button>
					</Box>
				</form>
				<McTable
					rows={vRol?.message?.roles ?? []}
					headers={{
						nombre: 'Rol',
					}}
					totalCols={{}}
					actions={[
						{
							tooltip: 'Eliminar rol',
							icon: <Delete color='warning' />,
							onClick: (row) => onDelete(row),
						},
					]}
				/>
			</Box>
		</>
	);
};

export default Rol;

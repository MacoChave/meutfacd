import { URL } from '@/api/server';
import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';
import { Option } from '@/components/McWithForms/McAutocomplete/McAutocomplete';
import { MyTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { RolType, defaultRol } from '@/models/Rol';
import { deleteData, postData } from '@/services/fetching';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { TabsProps } from '../../propTypes/tabsProps';
import { PickerRol } from '../PickerRol';

const Rol: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	const [rootRol, setRootRol] = useState(
		usuario.roles.split(' ')[0].toLowerCase()
	);
	const {
		data: vRol,
		isLoading: isLoadvRol,
		isError: isErrvRol,
		refetch,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_rol',
			query: { id_usuario: usuario.id_usuario },
		},
	});
	const {
		data: rols,
		isLoading: isLoadingRols,
		isError: isErrRols,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'rol',
			conditions: [
				{ column: 'nombre', operator: 'LIKE', value: `${rootRol}%` },
			],
		},
	});

	const { control, handleSubmit } = useForm<RolType>({
		defaultValues: defaultRol,
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<RolType> = async (data) => {
		const diffRol = vRol.filter(
			(vr: any) => vr.r_nombre.split(' ')[0].toLowerCase() !== rootRol
		);
		if (diffRol.length) {
			return swal(
				'¡No se puede agregar el permiso!',
				'El usuario tiene uno o varios roles diferentes al seleccionado',
				'error'
			);
		}
		const result = await postData({
			path: `${URL.USER_ROL}`,
			body: { id_usuario: usuario.id_usuario, id_rol: data.id_rol },
		});
		if (result) {
			swal('¡Rol actualizado!', '', 'success');
			refetch();
		}
	};

	const onDelete = async (data: any) => {
		const result = await deleteData({
			path: `${URL.USER_ROL}`,
			params: { id_usuario: usuario.id_usuario, id_rol: data.id_rol },
		});
		console.log(result);
		if (result) {
			swal('¡Rol eliminado!', '', 'success');
			refetch();
		}
	};

	const onChangeRootRol = (rol: string) => {
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
				<PickerRol
					rootRol={rootRol}
					onChangeRootRol={onChangeRootRol}
				/>
				<Typography variant='h6'>Agregar permisos</Typography>
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
							options={rols.map(
								(rol: RolType): Option => ({
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
				<MyTable
					rows={vRol}
					headers={{
						r_nombre: 'Rol',
					}}
					onDelete={onDelete}
					totalCols={{}}
				/>
			</Box>
		</>
	);
};

export default Rol;

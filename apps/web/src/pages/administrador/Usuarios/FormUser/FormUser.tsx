'use client';
import { McAutocomplete, McInput } from '@/components';
import { URL, URL_V2 } from '@/consts/Api';
import { TResponse, TResult } from '@/models/Fetching';
import { schemaUsuario, TUser } from '@/models/TUser';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import React, { CSSProperties } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type FormUserProps = {
	id_rol: number;
	style?: CSSProperties;
	onClose: () => void;
};

const FormUser: React.FC<FormUserProps> = ({ id_rol, style, onClose }) => {
	const { control, formState, watch, handleSubmit } = useForm<TUser>({
		defaultValues: {
			nombre: '',
			apellidos: '',
			genero: '',
			correo: '',
			carnet: 0,
			cui: 0,
			direccion: 'Guatemala Ciudad',
			fecha_nac: dayjs().format('YYYY-MM-DD'),
			id_rol: id_rol,
		},
		resolver: yupResolver(schemaUsuario),
		mode: 'onBlur',
		shouldFocusError: true,
	});

	const onSubmit: SubmitHandler<TUser> = async (body: TUser) => {
		try {
			if (!id_rol) throw new Error('No se ha seleccionado un rol');

			body = { ...body, id_rol: id_rol };

			const result: TResponse<any> = await postData({
				path: URL.USER,
				body,
			});

			onClose();

			swal('Éxito', 'Usuario creado correctamente', 'success');
		} catch (error: any) {
			swal('Error', error.response.data.error, 'error');
		}
	};

	return (
		<Box
			component={'form'}
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
				gap: 2,
				...style,
			}}
			onSubmit={handleSubmit(onSubmit)}>
			<McInput control={control as any} name='nombre' label='Nombres' />
			<McInput
				control={control as any}
				name='apellidos'
				label='Apellidos'
			/>
			<McAutocomplete
				control={control as any}
				label='Genero'
				name='genero'
				options={[
					{ label: 'Masculino', id: 'M' },
					{ label: 'Femenino', id: 'F' },
				]}
			/>
			<McInput control={control as any} name='correo' label='Correo' />
			<McInput control={control as any} name='carnet' label='Carnet' />
			<McInput control={control as any} name='cui' label='CUI' />
			<McInput
				control={control as any}
				name='direccion'
				label='Dirección'
			/>
			<McInput
				control={control as any}
				name='fecha_nac'
				label='Fecha de nacimiento'
				type='date'
			/>
			<Button variant='contained' type='submit'>
				Crear usuario
			</Button>
		</Box>
	);
};

export default FormUser;

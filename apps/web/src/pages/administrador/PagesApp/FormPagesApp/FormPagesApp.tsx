import { URL } from '@/consts/Api';
import { McInput } from '@/components/McWithForms/McInput';
import { TPageApp, schemaPageApp } from '@/models/PageApp';
import { TResult } from '@/models/Fetching';
import { putData } from '@/services/fetching';
import { Box, Button } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormPagesAppProps = {
	page: TPageApp;
	onClose: () => void;
};

const FormPagesApp: React.FC<FormPagesAppProps> = ({ page, onClose }) => {
	const { control, handleSubmit } = useForm<TPageApp>({
		defaultValues: { ...page },
		resolver: yupResolver(schemaPageApp),
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<TPageApp> = async (data) => {
		const result: TResult = await putData({
			path: `${URL.GENERIC}`,
			body: {
				table: 'ut_pagina',
				datos: {
					nombre: data.n_hijo,
					descripcion: data.descripcion,
					indice: data.i_hijo,
				},
			},
			params: { id_pagina: data.id_pagina },
		});

		if (result.affectedRows > 0) {
			swal('Guardado', 'Se ha guardado correctamente', 'success');
			onClose();
		}
	};

	return (
		<>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					m: 2,
					gap: 2,
				}}>
				<McInput
					control={control as any}
					name='n_hijo'
					label='Nombre de página'
				/>
				<McInput
					control={control as any}
					name='descripcion'
					label='Descripción de la página'
				/>
				<McInput
					control={control as any}
					name='i_hijo'
					label='Indice de la página'
				/>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignSelf: 'end',
						gap: 2,
					}}>
					<Button
						variant='outlined'
						color='primary'
						type='button'
						onClick={() => onClose()}>
						Cancelar
					</Button>
					<Button variant='contained' color='secondary' type='submit'>
						Guardar
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default FormPagesApp;

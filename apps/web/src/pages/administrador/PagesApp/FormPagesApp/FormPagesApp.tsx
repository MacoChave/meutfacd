import { URL } from '@/api/server';
import { McInput } from '@/components/McWithForms/McInput';
import { PageAppType } from '@/models/PageApp';
import { TResult } from '@/models/Fetching';
import { putData } from '@/services/fetching';
import { Box, Button } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type FormPagesAppProps = {
	page: PageAppType;
	onClose: () => void;
};

const FormPagesApp: React.FC<FormPagesAppProps> = ({ page, onClose }) => {
	const { control, handleSubmit } = useForm<PageAppType>({
		defaultValues: { ...page, icono: page.icono || '' },
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<PageAppType> = async (data) => {
		const result: TResult = await putData({
			path: `${URL.GENERIC}`,
			body: {
				table: 'ut_pagina',
				datos: {
					nombre: data.nombre,
					descripcion: data.descripcion,
					// icono: data.icono,
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
					name='nombre'
					label='Nombre de página'
				/>
				<McInput
					control={control as any}
					name='descripcion'
					label='Descripción de la página'
				/>
				<McInput
					control={control as any}
					name='icono'
					label='Abreviatura de la página'
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

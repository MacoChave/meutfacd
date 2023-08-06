import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { useCustomFetch } from '@/hooks/useFetch';
import { UploadFile } from '@/interfaces/UploadFile';
import { Draft, draftDefault, draftSchema } from '@/models/Draft';
import { postData, putData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import FileChooser from '../../components/controles/FileChooser';
import { style } from '@/themes/styles';

const Estacion1 = () => {
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const {
		data: revision,
		isLoading,
		isError,
	} = useCustomFetch({
		url: `${URL.REVIEW}/one`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'titulo',
				'fecha_revision',
				'detalle',
				'estado',
				'estacion',
			],
			order: {
				fecha_revision: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 1,
		},
	});

	const {
		control,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm<Draft>({
		defaultValues: draftDefault,
		mode: 'onBlur',
		resolver: yupResolver(draftSchema),
	});

	const onUpload = async (file: File) => {
		try {
			setIsUploading(true);
			const formData = new FormData();
			formData.append('draft', file);
			const data = await postData<UploadFile>({
				path: URL.STORAGE.DRAFT,
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': '*', // Required for CORS support to work
				},
			});
			setValue('name', data.name);
			swal(
				'¡Bien hecho!',
				'El archivo se subió correctamente',
				'success'
			);
			setIsUploaded(true);
		} catch (error: any) {
			errorHandler(error as AxiosError);
		} finally {
			setIsUploading(false);
		}
	};

	const onSubmit: SubmitHandler<Draft> = async (draft) => {
		try {
			if (revision.estado === 'P') {
				await putData({
					path: URL.THESIS,
					body: {
						titulo: draft.titulo,
						ruta_perfil: draft.name,
					},
				});
			} else {
				await postData({
					path: URL.THESIS,
					body: {
						titulo: draft.titulo,
						ruta_perfil: draft.name,
					},
				});
			}

			swal(
				'¡Bien hecho!',
				'El punto de tesis se presentó correctamente',
				'success'
			);
		} catch (error: any) {
			errorHandler(error as AxiosError);
		}
	};

	useEffect(() => {
		if (revision) {
			setValue('titulo', revision.titulo);
		}
	}, [revision]);

	if (isLoading) return <>Cargando revisión...</>;
	if (isError) return <>No se pudo cargar la revisión...</>;

	return (
		<>
			<Contenedor title='Presentar punto de tesis'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={style}>
						<Box>
							<Typography variant='h6'>
								Detalle del previo
							</Typography>
							<Typography>
								{revision?.detalle ?? 'Sin revisión'}
							</Typography>
						</Box>
						<Box>
							<Controller
								control={control}
								name='titulo'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Título del punto de tesis'
										variant='filled'
										error={!!errors.titulo}
										helperText={errors.titulo?.message}
									/>
								)}
							/>
						</Box>
						<Box
							sx={{
								gridColumn: { xs: '1', sm: '2' },
								gridRow: { xs: '1', sm: '1 / span 2' },
							}}>
							{!isUploaded ? (
								<FileChooser
									title='Punto de tesis'
									onUpload={onUpload}
								/>
							) : (
								<Button
									variant='contained'
									color='primary'
									type='submit'>
									Enviar
								</Button>
							)}
						</Box>
					</Box>
				</form>
			</Contenedor>
			{isUploading && <SpinLoader message='Subiendo tu punto de tesis' />}
		</>
	);
};

export default Estacion1;

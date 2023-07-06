import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { UploadFile } from '@/interfaces/UploadFile';
import { Draft, draftDefault, draftSchema } from '@/models/Draft';
import { postData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import FileChooser from '../../components/controles/FileChooser';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { isError } from '@tanstack/react-query';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Estacion1 = () => {
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const { data, isLoading, isError } = useCustomFetch({
		url: URL.GENERIC,
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
		} catch (error) {
			errorHandler(error as AxiosError);
		} finally {
			setIsUploading(false);
		}
	};

	const onSubmit: SubmitHandler<Draft> = async (draft) => {
		try {
			console.log('send draft', draft);
			const data = await postData({
				path: URL.TESIS._,
				body: {
					titulo: draft.titulo,
					ruta_perfil: draft.name,
				},
			});
			console.log(data);
			swal(
				'¡Bien hecho!',
				'El punto de tesis se presentó correctamente',
				'success'
			);
		} catch (error) {
			errorHandler(error as AxiosError);
		}
	};

	useEffect(() => {
		if (data) {
			const draft = data[0];
			setValue('titulo', draft.titulo);
		}
	}, [data, setValue]);

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
								{data[0].detalle || 'Sin revisión'}
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
						{!isUploaded ? (
							<Box
								sx={{
									gridColumnStart: 2,
									gridRow: '1 / span 2',
									p: 2,
									justifySelf: 'center',
									alignSelf: 'center',
								}}>
								<FileChooser
									title='Punto de tesis'
									onUpload={onUpload}
								/>
							</Box>
						) : (
							<Box
								sx={{
									gridColumnStart: 2,
									gridRow: '1 / span 2',
									p: 2,
									justifySelf: 'center',
									alignSelf: 'center',
								}}>
								<Button
									variant='contained'
									color='primary'
									type='submit'>
									Enviar
								</Button>
							</Box>
						)}
					</Box>
				</form>
			</Contenedor>
			{isUploading && <SpinLoader message='Subiendo archivo' />}
		</>
	);
};

export default Estacion1;

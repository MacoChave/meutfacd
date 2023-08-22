import { Contenedor } from '@/components';
import { Box, Button, TextField, Typography } from '@mui/material';
import FileChooser from '../../components/controles/FileChooser';
import { useEffect, useState } from 'react';
import { useCustomFetch } from '@/hooks/useFetch';
import { URL } from '@/api/server';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Draft, draftDefault, draftSchema } from '@/models/Draft';
import { yupResolver } from '@hookform/resolvers/yup';
import { postData, putData } from '@/services/fetching';
import { UploadFile } from '@/interfaces/UploadFile';
import { errorHandler } from '@/utils/errorHandler';
import swal from 'sweetalert';
import { AxiosError } from 'axios';
import { SpinLoader } from '@/components/Loader/SpinLoader';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Estacion4 = () => {
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	// const {
	// 	data: revision,
	// 	isLoading,
	// 	isError,
	// } = useCustomFetch({
	// 	url: `${URL.REVIEW}/one`,
	// 	method: 'post',
	// 	body: {
	// 		table: 'ut_v_revision',
	// 		columns: [
	// 			'id_revision',
	// 			'titulo',
	// 			'fecha_revision',
	// 			'detalle',
	// 			'estado',
	// 			'estacion',
	// 		],
	// 		order: {
	// 			fecha_revision: 'DESC',
	// 		},
	// 		limit: 1,
	// 	},
	// 	params: {
	// 		estacion: 4,
	// 	},
	// });

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
				path: URL.STORAGE.THESIS,
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
			// if (revision.estado === 'P') {
			// 	await putData({
			// 		path: URL.THESIS,
			// 		body: {
			// 			titulo: draft.titulo,
			// 			ruta_tesis: draft.name,
			// 		},
			// 	});
			// } else {
			// 	await postData({
			// 		path: URL.THESIS,
			// 		body: {
			// 			titulo: draft.titulo,
			// 			ruta_tesis: draft.name,
			// 		},
			// 	});
			// }

			swal(
				'¡Bien hecho!',
				'La tesis se ha guardado correctamente',
				'success'
			);
		} catch (error: any) {
			errorHandler(error as AxiosError);
		}
	};

	useEffect(() => {
		// if (revision) {
		// 	setValue('titulo', revision.titulo);
		// }
	}, []);

	// if (isLoading) return <p>Cargando...</p>;
	// if (isError) return <p>Ha ocurrido un error</p>;

	return (
		<>
			<Contenedor title='Comisión y estilo'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={style}>
						<Box>
							<Typography variant='h6'>
								Detalle del previo
							</Typography>
							<Typography>{'Sin revisión'}</Typography>
						</Box>
						<Box>
							<Controller
								control={control}
								name='titulo'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Título de la tesis'
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
									title='Tesis'
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
			{isUploading && <SpinLoader message='Subiendo tesis' />}
		</>
	);
};

export default Estacion4;

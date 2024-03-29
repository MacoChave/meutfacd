import { URL } from '@/consts/Api';
import { Contenedor, FileChooser } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { APROBADO, REVISION } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUploadFile } from '@/models/UploadFile';
import { TDictamen, dictamenDefault, dictamenSchema } from '@/models/Dictamen';
import { getData, postData, putData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { errorHandler } from '@/utils/errorHandler';
import { getChipColor, getChipLabel } from '@/utils/formatHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { OpenInBrowser } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type TopicChangeProps = {};

const TopicChange: FC<TopicChangeProps> = ({}) => {
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const {
		data: revision,
		isLoading,
		isError,
		refetch,
	} = useCustomFetch({
		url: `${URL.REVIEW}/one`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'titulo',
				'fecha',
				'detalle',
				'estado',
				'tutor',
				'ruta_perfil',
			],
			order: {
				fecha_revision: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 4,
		},
	});

	const {
		control,
		formState: { errors },
		reset,
		setValue,
		handleSubmit,
	} = useForm<TDictamen>({
		defaultValues: dictamenDefault,
		mode: 'onBlur',
		resolver: yupResolver(dictamenSchema),
	});

	const onUpload = async (file: File) => {
		try {
			setIsUploading(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('filename', 'dictamen');
			const data = await postData<TUploadFile>({
				path: URL.STORAGE,
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': '*', // Required for CORS support to work
				},
			});
			setValue('ruta_dictamen', data.name);
			swal(
				'¡Bien hecho!',
				'El archivo se subió correctamente',
				'success'
			);
			setIsUploaded(true);
		} catch (error: any) {
			// errorHandler(error as AxiosError);
		} finally {
			setIsUploading(false);
		}
	};

	const onSubmit: SubmitHandler<TDictamen> = async (draft) => {
		try {
			await putData({
				path: URL.THESIS,
				body: {
					titulo: draft.titulo,
				},
			});

			await postData({
				path: URL.REVIEW,
				body: {
					estacion: 4,
					ruta_dictamen: draft.ruta_dictamen,
					detalle: `Se cambió el título de la tesis de: ${draft.detalle} a: ${draft.titulo}`,
					estado: APROBADO,
				},
			});

			swal(
				'¡Bien hecho!',
				'Su tesis se presentó correctamente',
				'success'
			);
			reset();
			refetch();
		} catch (error: any) {
			errorHandler(error as AxiosError);
		}
	};

	const openPDF = async () => {
		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: revision.ruta_tesis },
		});
		window.open(url);
	};

	useEffect(() => {
		if (revision) {
			setValue('titulo', revision.titulo);
		}
	}, [revision]);

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return <Typography>No se pudo cargar la revisión...</Typography>;
	return (
		<>
			<Contenedor title='Cambio de tema (Solo si lo requiere el asesor)'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={style}>
						<Box>
							<Typography variant='h6'>
								Detalle del dictámen
								<Box component='span' sx={{ ml: 2 }}>
									<Chip
										color={getChipColor(revision.estado)}
										label={getChipLabel(revision.estado)}
									/>
									{revision.ruta_tesis && (
										<IconButton
											color='info'
											title='Ver archivo subido'
											onClick={() => openPDF()}>
											<OpenInBrowser />
										</IconButton>
									)}
								</Box>
							</Typography>
							<Typography>
								Docente revisor: {revision?.tutor || ''}
							</Typography>
							<Typography>{revision?.detalle ?? ''}</Typography>
						</Box>
						<Box>
							<Controller
								control={control}
								name='detalle'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Título actual de la tesis'
										variant='standard'
										InputProps={{
											readOnly:
												revision.estado === REVISION ||
												revision.estado === APROBADO,
										}}
										error={!!errors.titulo}
										helperText={errors.titulo?.message}
									/>
								)}
							/>
							<Controller
								control={control}
								name='titulo'
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Nuevo título de la tesis'
										variant='standard'
										InputProps={{
											readOnly:
												revision.estado === REVISION ||
												revision.estado === APROBADO,
										}}
										error={!!errors.titulo}
										helperText={errors.titulo?.message}
									/>
								)}
							/>
						</Box>
						{!(
							revision.estado === REVISION ||
							revision.estado === APROBADO
						) && (
							<Box
								sx={{
									gridColumn: { xs: '1', sm: '2' },
									gridRow: { xs: '1', sm: '1 / span 2' },
								}}>
								{!isUploaded ? (
									<FileChooser
										title='Dictámen'
										onUpload={onUpload}
										disabled={true}
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
						)}
					</Box>
				</form>
			</Contenedor>
			{isUploading && (
				<SpinLoader message='Subiendo dictámen de asesor' />
			)}
		</>
	);
};

export default TopicChange;

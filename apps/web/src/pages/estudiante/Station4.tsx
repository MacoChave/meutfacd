import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import {
	APROBADO,
	ESPERA,
	PENDIENTE,
	PREVIA,
	RECHAZADO,
	REVISION,
} from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { UploadFile } from '@/interfaces/UploadFile';
import { Draft, draftDefault, draftSchema } from '@/models/Draft';
import { getData, postData, putData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { errorHandler } from '@/utils/errorHandler';
import { getChipColor, getChipLabel } from '@/utils/formatHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { Chat, OpenInBrowser } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import FileChooser from '../../components/controles/FileChooser';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { ReviewType } from '@/models/Review';
import { EmptyReview } from '@/components/EmptyReview';

const Estacion4 = () => {
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
				'id_tutor',
			],
			sort: {
				fecha: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 5,
		},
	});

	const {
		control,
		formState: { errors },
		reset,
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
			formData.append('file', file);
			formData.append('filename', 'thesis');
			const data = await postData<UploadFile>({
				path: URL.STORAGE,
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
			// errorHandler(error as AxiosError);
		} finally {
			setIsUploading(false);
		}
	};

	const onSubmit: SubmitHandler<Draft> = async (draft) => {
		try {
			if (revision.estado === PREVIA || revision.estado === RECHAZADO) {
				Promise.all([
					putData({
						path: URL.THESIS,
						body: {
							titulo: draft.titulo,
							ruta_tesis: draft.name,
						},
					}),
					postData({
						path: URL.REVIEW,
						body: {
							id_curso_tutor: revision.id_curso_tutor,
							id_tutor: revision.id_tutor,
							id_tesis: revision.id_tesis,
							estado: REVISION,
							estacion: 5,
						},
					}),
				]);
			} else if (
				revision.estado === ESPERA ||
				revision.estado === PENDIENTE
			) {
				Promise.all([
					putData({
						path: URL.THESIS,
						body: {
							titulo: draft.titulo,
							ruta_tesis: draft.name,
						},
					}),
					putData({
						path: URL.REVIEW,
						body: {
							estado: ESPERA,
						},
						params: {
							id_revision: revision.id_revision,
						},
					}),
				]);
			} else {
				await postData({
					path: URL.THESIS,
					body: {
						titulo: draft.titulo,
						ruta_tesis: draft.name,
					},
				});
			}

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

	const createChat = async () => {
		const data = await postData({
			path: URL.CHAT,
			params: { user_id: (revision as ReviewType).id_tutor },
		});
		console.log(data);
	};

	useEffect(() => {
		if (revision) {
			setValue('titulo', revision.titulo);
		}
	}, [revision]);

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return <Typography>No se pudo cargar la revisión...</Typography>;

	if (!revision)
		return <EmptyReview title='Comisión y estilo (Presentar tesis)' />;

	return (
		<>
			<Contenedor title='Comisión y estilo (Presentar tesis)'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={style}>
						<Box>
							<Typography variant='h6'>
								Detalle del previo
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
								Docente revisor:{' '}
								{revision?.tutor || 'Sin asignación'}
								{revision?.id_tutor && (
									<IconButton
										color='info'
										title='Crear chat'
										onClick={createChat}>
										<Chat />
									</IconButton>
								)}
							</Typography>
							<Typography>
								{revision?.detalle ??
									'Aún no hay detalle del previo'}
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
										title='Tesis'
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
			{isUploading && <SpinLoader message='Subiendo tesis' />}
		</>
	);
};

export default Estacion4;

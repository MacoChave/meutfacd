import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { URL } from '@/consts/Api';
import {
	APROBADO,
	ESTACION1,
	PREVIA,
	RECHAZADO,
	REVISION,
} from '@/consts/Vars';
import { useFetch } from '@/hooks/useFetch';
import { TDraft, draftDefault, draftSchema } from '@/models/Draft';
import { TResponse } from '@/models/Fetching';
import { TRevision } from '@/models/TRevision';
import { getData, postData, putData } from '@/services/fetching';
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
import { FC, lazy, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
const TutorInfo = lazy(() => import('../components/TutorInfo/TutorInfo'));
const DetailReview = lazy(
	() => import('../components/DetailReview/DetailReview')
);
const UploadsReview = lazy(
	() => import('../components/UploadsReview/UploadsReview')
);
const FileChooser = lazy(() => import('@/components/controles/FileChooser'));

export type ThesisCoverProps = {};

const ThesisCover: FC<ThesisCoverProps> = ({}) => {
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const { data, isLoading, isError, error, refetch } = useFetch({
		url: `${URL.REVIEW}/one`,
		params: {
			estacion: ESTACION1,
		},
	});

	const {
		control,
		formState: { errors },
		reset,
		setValue,
		handleSubmit,
	} = useForm<TDraft>({
		defaultValues: draftDefault,
		mode: 'onBlur',
		values: {
			name: data?.message!.tesis!.ruta_perfil ?? '',
			titulo: data?.message!.tesis!.titulo ?? '',
		},
		resolver: yupResolver(draftSchema),
	});

	const onUpload = async (file: File) => {
		try {
			setIsUploading(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('filename', 'preview');
			const data: TResponse<string> = await postData<TResponse<string>>({
				path: `${URL.STORAGE}/draft`,
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': '*', // Required for CORS support to work
				},
			});
			setValue('name', data.message);
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

	const onSubmit: SubmitHandler<TDraft> = async (draft) => {
		try {
			if (data?.message) {
				const newTesis: TResponse<any> = await postData({
					path: `${URL.THESIS}`,
					body: draft,
				});

				if (newTesis.code === 200) {
					swal(
						'¡Bien hecho!',
						'El punto de tesis se presentó correctamente',
						'success'
					);
				} else {
					swal('Error', newTesis.message, 'error');
					return;
				}
			} else if (
				data?.message?.estado === PREVIA ||
				data?.message?.estado === RECHAZADO
			) {
				const updateReview: TResponse<any> = await putData({
					path: `${URL.REVIEW}`,
					body: draft,
				});

				if (updateReview.code === 200) {
					swal(
						'¡Bien hecho!',
						'El punto de tesis se presentó correctamente',
						'success'
					);
				} else {
					swal('Error', updateReview.message, 'error');
					return;
				}
			}

			reset();
			refetch();
		} catch (error: any) {
			errorHandler(error as AxiosError);
		}
	};

	const openPDF = async (filename: string) => {
		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: filename },
		});
		window.open(url);
	};

	const createChat = async () => {
		const response = await postData({
			path: URL.CHAT,
			params: { user_id: (data?.message as TRevision).id_tutor },
		});
		console.log(response);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return <Typography>No se pudo cargar la revisión ...</Typography>;

	return (
		<>
			<Contenedor title='Presentar punto de tesis'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(250px, 1fr))',
							alignItems: 'center',
							gap: 2,
						}}>
						<Box>
							<Typography variant='h6'>
								Detalle del previo
								<Box component='span' sx={{ ml: 2 }}>
									<Chip
										color={getChipColor(
											data?.message?.estado ?? 'N'
										)}
										label={getChipLabel(
											data?.message?.estado ?? 'N'
										)}
									/>
									{data?.message?.tesis?.ruta_perfil && (
										<IconButton
											color='info'
											title='Ver archivo subido'
											onClick={() =>
												openPDF(
													data?.message?.tesis
														?.ruta_perfil
												)
											}>
											<OpenInBrowser />
										</IconButton>
									)}
								</Box>
							</Typography>
							<Typography>
								Docente revisor:{' '}
								{data?.message?.tutor ?? 'Sin asignación'}
								{data?.message?.id_tutor && (
									<IconButton
										color='info'
										title='Crear chat'
										onClick={createChat}>
										<Chat />
									</IconButton>
								)}
							</Typography>
							<Typography>
								{data?.message?.detalle ?? 'Sin comentarios'}
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
												data?.message?.estado ===
													REVISION ||
												data?.message?.estado ===
													APROBADO,
										}}
										error={!!errors.titulo}
										helperText={errors.titulo?.message}
									/>
								)}
							/>
						</Box>
						{!(
							data?.message?.estado === REVISION ||
							data?.message?.estado === APROBADO
						) && (
							<Box
								sx={{
									// gridColumn: { xs: '1', sm: '2' },
									// gridRow: { xs: '1', sm: '1 / span 2' },
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}>
								{!isUploaded && (
									<FileChooser
										title='Punto de tesis'
										onUpload={onUpload}
										disabled={true}
									/>
								)}
								{isUploaded ||
									(data?.message && (
										<Button
											variant='contained'
											color='primary'
											type='submit'>
											Enviar
										</Button>
									))}
							</Box>
						)}
					</Box>
				</form>
			</Contenedor>
			{isUploading && <SpinLoader message='Subiendo punto de tesis' />}
		</>
	);
};

export default ThesisCover;

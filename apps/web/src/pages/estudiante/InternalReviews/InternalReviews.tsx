import { URL } from '@/consts/Api';
import { Contenedor, FileChooser } from '@/components';
import { EmptyReview } from '@/components/EmptyReview';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { PREVIA, RECHAZADO, REVISION } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUploadFile } from '@/models/UploadFile';
import { TReview } from '@/models/Review';
import { getData, postData, putData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { errorHandler } from '@/utils/errorHandler';
import {
	formatDate,
	formatToInputDate,
	getChipColor,
	getChipLabel,
} from '@/utils/formatHandler';
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
import { FC, useState } from 'react';
import swal from 'sweetalert';

export type InternalReviewsProps = {};

const InternalReviews: FC<InternalReviewsProps> = ({}) => {
	const [loading, setLoading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [name, setName] = useState('');
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
				'ruta_tesis',
				'id_tutor',
				'sala',
			],
			sort: {
				fecha: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 6,
		},
	});

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
			params: { user_id: (revision as TReview).id_tutor },
		});
		console.log(data);
	};

	const onUpload = async (file: File) => {
		try {
			setIsUploaded(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('filename', 'thesis');
			const data = await postData<TUploadFile>({
				path: `${URL.STORAGE}/draft`,
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setName(data.name);
			swal('¡Listo!', 'Se ha subido el archivo', 'success');
		} finally {
			setIsUploaded(false);
		}
	};

	const onSubmit = async () => {
		try {
			setLoading(true);
			if (revision.estado === PREVIA || revision.estado === RECHAZADO) {
				Promise.all([
					putData({
						path: URL.THESIS,
						body: {
							// titulo: draft.titulo,
							ruta_tesis: name,
						},
					}),
					putData({
						path: URL.REVIEW,
						body: {
							id_tutor: revision.id_tutor,
							id_tesis: revision.id_tesis,
							estado: REVISION,
							fecha: formatToInputDate(revision.fecha, true),
							estacion: 6,
						},
						params: { id_revision: revision.id_revision },
					}),
				]);
			}

			swal(
				'¡Bien hecho!',
				'Su tesis se presentó correctamente',
				'success'
			);
		} catch (error) {
			errorHandler(error as AxiosError);
		} finally {
			refetch();
			setLoading(false);
		}
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	if (!revision) return <EmptyReview title='Cita a previos internos' />;

	return (
		<>
			<Contenedor title='Cita a previos internos'>
				<Box sx={style}>
					<Box>
						<Typography variant='h6'>
							Detalle del previo
							<Box component={'span'} sx={{ ml: 2 }}>
								<Chip
									color={getChipColor(revision.estado)}
									label={getChipLabel(revision.estado)}
								/>
								{revision.ruta_tesis && (
									<IconButton
										color='info'
										title='Ver archivo'
										onClick={() => openPDF()}>
										<OpenInBrowser />
									</IconButton>
								)}
							</Box>
						</Typography>
						<Typography>
							Docente revisor{' '}
							{revision?.tutor && 'Sin asignación'}
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
						<TextField
							variant='standard'
							label='Catedrático'
							InputProps={{
								disabled: true,
							}}
							value={revision?.tutor || ''}
						/>
						<TextField
							variant='standard'
							label='Fecha de cita'
							InputProps={{
								disabled: true,
							}}
							value={
								(revision?.sala &&
									formatDate({
										date: new Date(revision?.fecha),
										withTime: true,
									})) ||
								''
							}
						/>
						<TextField
							variant='standard'
							label='Sala'
							InputProps={{
								disabled: true,
							}}
							value={revision?.sala || ''}
						/>
					</Box>
					{revision.estado === PREVIA && (
						<>
							<FileChooser onUpload={onUpload} />
							<Button
								variant='contained'
								color='primary'
								type='submit'
								onClick={onSubmit}>
								Enviar
							</Button>
						</>
					)}
				</Box>
			</Contenedor>
			{isUploaded && <SpinLoader />}
			{loading && <DotsLoaders />}
		</>
	);
};

export default InternalReviews;

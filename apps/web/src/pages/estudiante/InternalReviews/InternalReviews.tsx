import { URL } from '@/api/server';
import { Contenedor, FileChooser } from '@/components';
import { EmptyReview } from '@/components/EmptyReview';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { PREVIA, RECHAZADO, REVISION } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { UploadFile } from '@/interfaces/UploadFile';
import { ReviewType } from '@/models/Review';
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

	const openPDF = async (filename: string) => {
		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: filename },
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

	const onUpload = async (file: File) => {
		try {
			setIsUploaded(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('filename', 'thesis');
			const data = await postData<UploadFile>({
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<Box>
							<Chip
								color={getChipColor(revision.estado)}
								label={getChipLabel(revision.estado)}
							/>
							<IconButton
								color='info'
								title='Ver archivo'
								onClick={() => openPDF(revision.ruta_tesis)}>
								<OpenInBrowser />
							</IconButton>
							{revision.id_tutor && (
								<IconButton
									color='info'
									title='Crear chat'
									onClick={createChat}>
									<Chat />
								</IconButton>
							)}
						</Box>
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
								formatDate({
									date: new Date(revision?.fecha),
									withTime: true,
								}) || ''
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

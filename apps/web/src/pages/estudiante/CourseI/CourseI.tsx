import { URL } from '@/consts/Api';
import { Contenedor, FileChooser } from '@/components';
import { EmptyReview } from '@/components/EmptyReview';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { APROBADO } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUploadFile } from '@/models/UploadFile';
import { TReview } from '@/models/Review';
import { getData, postData, putData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { formatDate, getChipColor, getChipLabel } from '@/utils/formatHandler';
import { Chat, Download } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import swal from 'sweetalert';
import { PickDays } from '../../administrador/Courses/Gestion/PickDays';

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

export type CourseIProps = {};

const CourseI: FC<CourseIProps> = ({}) => {
	const [loading, setLoading] = useState(false);
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
				'dias',
				'fecha_curso',
				'estado',
				'tutor',
				'salon',
				'id_tutor',
				'ruta_asesor',
				'ruta_certificado',
			],
			sort: {
				fecha: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 2,
		},
	});

	const createChat = async () => {
		const data = await postData({
			path: URL.CHAT,
			params: { user_id: (revision as TReview).id_tutor },
		});
		console.log(data);
	};

	const onUploadAsesor = async (file: File) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('filename', 'asesor');
			const data = await postData<TUploadFile>({
				path: `${URL.STORAGE}/draft`,
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					'Access-Control-Allow-Origin': '*',
				},
			});
			await putData({
				path: URL.THESIS,
				body: { ruta_asesor: data.name },
				params: { id_tesis: revision.id_tesis },
			});
			if (revision.estado === APROBADO) {
				// Si la tesis ya está aprobada, elimino el nombramiento anterior
				await putData({
					path: URL.REVIEW,
					body: { ruta_certificado: '' },
					params: { id_revision: revision.id_revision },
				});
			}
			refetch();
			swal('¡Listo!', 'Se ha presentado al asesor', 'success');
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const onDownloadAsesor = async () => {
		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: (revision as TReview).ruta_asesor },
		});
		window.open(url);
	};

	const onDownloadNombramiento = async () => {
		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: (revision as TReview).ruta_certificado },
		});
		window.open(url);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	if (!revision)
		return (
			<EmptyReview title='Curso I: Introducción a la planeación científica' />
		);

	return (
		<>
			<Contenedor title='Curso I: Introducción a la planeación científica'>
				<Box sx={style}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						{revision?.id_tutor && (
							<IconButton
								sx={{ alignSelf: 'flex-start' }}
								color='info'
								title='Crear chat'
								onClick={createChat}>
								<Chat />
							</IconButton>
						)}
						<TextField
							variant='standard'
							label='Catedrático'
							InputProps={{
								disabled: true,
							}}
							value={revision?.tutor ?? 'No asignado'}
						/>
						<TextField
							variant='standard'
							label='Fecha de inicio'
							InputProps={{
								disabled: true,
							}}
							value={
								formatDate({
									date: new Date(revision?.fecha_curso),
								}) ?? 'Fecha de inicio del curso'
							}
						/>
						{/* <TextField
							variant='standard'
							label='Horario'
							InputProps={{
								disabled: true,
							}}
							value={`${revision?.hora_inicio ?? 'Inicio'} - ${
								revision?.hora_final ?? 'Final'
							}`}
						/>	 */}
						<PickDays
							days={revision?.dias ?? []}
							setDays={(days: string[]) => {}}
							readOnly={true}
						/>
						<TextField
							variant='standard'
							label='Salón'
							InputProps={{
								disabled: true,
							}}
							value={revision?.salon ?? 'No asignado'}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<Box sx={boxStyle}>
							<Typography>Resultado</Typography>
							<Chip
								label={getChipLabel(revision.estado)}
								color={getChipColor(revision.estado)}
							/>
						</Box>
						{revision.ruta_asesor && (
							<Box sx={boxStyle}>
								<Typography>Presentación del asesor</Typography>
								<IconButton
									color='primary'
									onClick={onDownloadAsesor}>
									<Download />
								</IconButton>
							</Box>
						)}
						{revision.ruta_certificado && (
							<Box sx={boxStyle}>
								<Typography>Nombramiento de asesor</Typography>
								<IconButton
									color='primary'
									onClick={onDownloadNombramiento}>
									<Download />
								</IconButton>
							</Box>
						)}
						{revision.estado === APROBADO && (
							<>
								<FileChooser
									title={
										!revision.ruta_certificado
											? 'Presentar asesor'
											: 'Cambiar asesor'
									}
									onUpload={onUploadAsesor}
									disabled={true}
								/>
							</>
						)}
					</Box>
				</Box>
			</Contenedor>
			{loading && <SpinLoader />}
		</>
	);
};

export default CourseI;

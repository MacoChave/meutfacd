import { URL } from '@/consts/Api';
import { Contenedor } from '@/components';
import { EmptyReview } from '@/components/EmptyReview';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { TReview } from '@/models/Review';
import { postData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { formatDate, getChipColor, getChipLabel } from '@/utils/formatHandler';
import { Chat } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';
import { FC } from 'react';

export type PrintingRequestProps = {};

const PrintingRequest: FC<PrintingRequestProps> = ({}) => {
	const { data, isLoading, isError } = useCustomFetch({
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
			estacion: 7,
		},
	});

	const createChat = async () => {
		const result: TResult = await postData({
			path: URL.CHAT,
			params: { user_id: (data as TReview).id_tutor },
		});
		console.log(result);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	if (!data) return <EmptyReview title='Solicitud de impresión de tesis' />;

	return (
		<>
			<Contenedor title='Solicitud de impresión de tesis'>
				<Box sx={style}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<Box>
							<Chip
								color={getChipColor(data.estado)}
								label={getChipLabel(data.estado)}
							/>
							{data.id_tutor && (
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
							value={data?.tutor || ''}
						/>
						<TextField
							variant='standard'
							label='Fecha'
							InputProps={{
								disabled: true,
							}}
							value={
								data?.sala !== ''
									? formatDate({
											date: new Date(data?.fecha),
											withTime: true,
									  })
									: ''
							}
						/>
						<TextField
							variant='standard'
							label='Sala'
							InputProps={{
								disabled: true,
							}}
							value={data?.sala || ''}
						/>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default PrintingRequest;

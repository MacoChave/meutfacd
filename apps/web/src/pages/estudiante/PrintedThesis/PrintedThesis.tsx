import { Contenedor, DotsLoaders, EmptyReview } from '@/components';
import { URL } from '@/consts/Api';
import { ESTACION8 } from '@/consts/Vars';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { TResult } from '@/models/Fetching';
import { TRevision } from '@/models/TRevision';
import { postData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { formatDate, getChipColor, getChipLabel } from '@/utils/formatHandler';
import { Chat } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

export type PrintedThesisProps = {};

const PrintedThesis: React.FC<PrintedThesisProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useFetch({
		url: `${URL.REVIEW}/one`,
		params: {
			estacion: ESTACION8,
		},
	});

	const createChat = async () => {
		const result: TResult = await postData({
			path: URL.CHAT,
			params: { user_id: (data as TRevision).id_tutor },
		});
		console.log(result);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	if (!data.message) return <EmptyReview title='Entrega de tesis' />;

	return (
		<>
			<Contenedor title='Entrega de tesis'>
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

export default PrintedThesis;

import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { EmptyReview } from '@/components/EmptyReview';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { ReviewType } from '@/models/Review';
import { postData } from '@/services/fetching';
import { style } from '@/themes/styles';
import { formatDate, getChipColor, getChipLabel } from '@/utils/formatHandler';
import { Chat } from '@mui/icons-material';
import { Box, Chip, IconButton, TextField, Typography } from '@mui/material';
import { PickDays } from '../../administrador/Courses/Gestion/PickDays';
import { FC } from 'react';

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

export type CourseIIProps = {};

const CourseII: FC<CourseIIProps> = ({}) => {
	const {
		data: revision,
		isLoading,
		isError,
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
			],
			sort: {
				fecha: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 3,
		},
	});

	const createChat = async () => {
		const data = await postData({
			path: URL.CHAT,
			params: { user_id: (revision as ReviewType).id_tutor },
		});
		console.log(data);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	if (!revision)
		return (
			<EmptyReview title='Curso II: Elaboración y planeación de tesis' />
		);

	return (
		<>
			<Contenedor title='Curso II: Elaboración y planeación de tesis'>
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
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default CourseII;

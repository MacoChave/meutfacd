import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';
import { McInput } from '@/components/McWithForms/McInput';
import { useCustomFetch } from '@/hooks/useFetch';
import { TPeriod } from '@/models/Period';
import { TResult } from '@/models/Fetching';
import { scheduleDefault, scheduleSchema, TSchedule } from '@/models/Schedule';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Refresh } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type FormScheduleProps = {
	onClose: () => void;
};

const FormSchedule: React.FC<FormScheduleProps> = ({ onClose }) => {
	const {
		control,
		formState: { errors, dirtyFields },
		reset,
		handleSubmit,
	} = useForm<TSchedule>({
		defaultValues: scheduleDefault,
		mode: 'onBlur',
		resolver: yupResolver(scheduleSchema),
	});

	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.PERIOD}/all`,
		method: 'post',
	});

	const onSubmit: SubmitHandler<TSchedule> = async (data) => {
		const result: TResult = await postData({
			path: `${URL.SCHEDULE}`,
			body: {
				id_jornada: data.id_jornada,
				hora_inicio: data.hora_inicio,
				hora_final: data.hora_final,
			},
		});
		if (result.warningStatus) {
			swal('Error', result.info, 'error');
			return;
		}
		swal('Éxito', 'Se creó la jornada', 'success');
		reset();
		onClose();
	};

	if (isLoading) return <DotsLoaders />;
	if (isError)
		return <Typography>No se pudo recuperar las jornadas</Typography>;

	return (
		<Box
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				alignContent: 'center',
				alignItems: 'center',
				gap: 2,
			}}>
			<Typography variant='body1' component={'h2'} gutterBottom>
				Recargar jornadas
				<IconButton color='secondary' onClick={() => refetch()}>
					<Refresh />
				</IconButton>
			</Typography>
			<McAutocomplete
				control={control as any}
				name='id_jornada'
				label='Jornada'
				options={data.map((item: TPeriod) => ({
					id: item.id_jornada,
					label: item.nombre,
				}))}
			/>
			<McInput
				control={control as any}
				name='hora_inicio'
				label='Hora de inicio'
				type='time'
			/>
			<McInput
				control={control as any}
				name='hora_final'
				label='Hora de finalización'
				type='time'
			/>
			<Button variant='contained' color='primary' type='submit'>
				Guardar
			</Button>
		</Box>
	);
};

export default FormSchedule;

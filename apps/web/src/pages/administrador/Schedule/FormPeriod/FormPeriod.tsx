import { URL } from '@/api/server';
import { McInput } from '@/components/McWithForms/McInput';
import { PeriodDefault, PeriodSchema, TPeriod } from '@/models/Period';
import { TResult } from '@/models/Fetching';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type FormPeriodProps = {
	onClose: () => void;
};

const FormPeriod: React.FC<FormPeriodProps> = ({ onClose }) => {
	const {
		control,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<TPeriod>({
		defaultValues: PeriodDefault,
		mode: 'onBlur',
		resolver: yupResolver(PeriodSchema),
	});

	const onSubmit: SubmitHandler<TPeriod> = async (data) => {
		const result: TResult = await postData({
			path: `${URL.PERIOD}`,
			body: data,
		});
		if (result.warningStatus) {
			swal('Error', result.info, 'error');
			return;
		}
		swal('Éxito', 'Se creó la jornada', 'success');
		reset();
		onClose();
	};

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
			<McInput control={control as any} name='nombre' label='Nombre' />
			<Button variant='contained' color='primary' type='submit'>
				Guardar
			</Button>
		</Box>
	);
};

export default FormPeriod;

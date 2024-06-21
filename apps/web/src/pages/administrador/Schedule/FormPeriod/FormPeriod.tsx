import { URL } from '@/consts/Api';
import { McInput } from '@/components/McWithForms/McInput';
import { periodDefault, schemaPeriod, TPeriod } from '@/models/Period';
import { TResult } from '@/models/Fetching';
import { postData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import React, { Dispatch } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type FormPeriodProps = {
	onClose: () => void;
	setReload: Dispatch<React.SetStateAction<boolean>>;
};

const FormPeriod: React.FC<FormPeriodProps> = ({ onClose, setReload }) => {
	const {
		control,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<TPeriod>({
		defaultValues: periodDefault,
		mode: 'onBlur',
		resolver: yupResolver(schemaPeriod),
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
		setReload(true);
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

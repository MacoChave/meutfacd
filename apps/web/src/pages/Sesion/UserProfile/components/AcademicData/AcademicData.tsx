import { McAutocomplete } from '@/components/McWithForms/McAutocomplete';
import { UserType } from '@/models/Perfil';
import { PickHorario } from '@/pages/encargado/components/PickHorario';
import { PickJornada } from '@/pages/encargado/components/PickJornada';
import { Box } from '@mui/material';
import React from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

export type AcademicDataProps = {};

const AcademicData: React.FC<AcademicDataProps> = ({}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext<UserType>();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
			}}>
			<McAutocomplete
				control={control as FieldValues}
				name='id_jornada'
				label='Jornada'
				options={[]}
			/>
		</Box>
	);
};

export default AcademicData;

import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { TSchedule } from '@/models/Schedule';
import { Typography } from '@mui/material';
import React from 'react';

export type PickHorarioProps = {
	id_jornada: number;
	horario: TSchedule;
	setHorario: (horario: TSchedule) => void;
};

const PickHorario: React.FC<PickHorarioProps> = ({
	id_jornada,
	horario,
	setHorario,
}) => {
	const {
		data,
		isLoading: isLoadHorario,
		isError: isErrHorario,
	} = useFetch({
		url: `${URL.SCHEDULE}/all`,
		params: { id_jornada },
	});

	if (isLoadHorario) return <DotsLoaders />;
	if (isErrHorario) return <Typography>Error al cargar horarios</Typography>;

	return (
		<McAutocomplete
			label='Horario'
			colLabel='hora_inicio'
			value={horario}
			options={data?.message?.data ?? []}
			isLoading={isLoadHorario}
			isError={isErrHorario}
			setValue={setHorario}
		/>
	);
};

export default PickHorario;

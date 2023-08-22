import { URL } from '@/api/server';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch } from '@/hooks/useFetch';
import { ScheduleType } from '@/models/Schedule';
import { Typography } from '@mui/material';
import React from 'react';

export type PickHorarioProps = {
	id_jornada: number;
	horario: ScheduleType;
	setHorario: (horario: ScheduleType) => void;
};

const PickHorario: React.FC<PickHorarioProps> = ({
	id_jornada,
	horario,
	setHorario,
}) => {
	const {
		data: horarios,
		isLoading: isLoadingHorarios,
		isError: isErrorHorarios,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_horario',
		},
		params: {
			id_jornada: id_jornada ?? 0,
		},
	});

	if (isLoadingHorarios) return <Typography>Cargando horarios</Typography>;
	if (isErrorHorarios)
		return <Typography>Error al cargar horarios</Typography>;

	return (
		<McAutocomplete
			label='Horario'
			colLabel='hora_inicio'
			value={horario}
			options={horarios}
			isLoading={isLoadingHorarios}
			isError={isErrorHorarios}
			setValue={setHorario}
		/>
	);
};

export default PickHorario;

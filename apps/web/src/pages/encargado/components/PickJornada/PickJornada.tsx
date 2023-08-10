import { URL } from '@/api/server';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch } from '@/hooks/useFetch';
import { PeriodType } from '@/models/Period';
import React from 'react';

export type PickJornadaProps = {
	jornada: PeriodType;
	setJornada: (jornada: PeriodType) => void;
};

const PickJornada: React.FC<PickJornadaProps> = ({ jornada, setJornada }) => {
	const {
		data: jornadas,
		isLoading: isLoadingJornadas,
		isError: isErrorJornadas,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_jornada',
		},
	});
	return (
		<McAutocomplete
			label='Jornada'
			colLabel='nombre'
			value={jornada}
			options={jornadas}
			isLoading={isLoadingJornadas}
			isError={isErrorJornadas}
			setValue={setJornada}
		/>
	);
};

export default PickJornada;

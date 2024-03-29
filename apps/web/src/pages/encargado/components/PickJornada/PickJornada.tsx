import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch } from '@/hooks/useFetch';
import { TPeriod } from '@/models/Period';
import { Typography } from '@mui/material';
import React from 'react';

export type PickJornadaProps = {
	jornada: TPeriod;
	setJornada: (jornada: TPeriod) => void;
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

	if (isLoadingJornadas) return <DotsLoaders />;
	if (isErrorJornadas)
		return <Typography>Error al cargar jornadas</Typography>;

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

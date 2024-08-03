import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import { TPeriod } from '@/models/Period';
import { Typography } from '@mui/material';
import React from 'react';

export type PickJornadaProps = {
	jornada: TPeriod;
	setJornada: (jornada: TPeriod) => void;
};

const PickJornada: React.FC<PickJornadaProps> = ({ jornada, setJornada }) => {
	const {
		data,
		isLoading: isLoadJornadas,
		isError: isErrJornada,
	} = useFetch({
		url: `${URL.PERIOD}/all`,
	});

	if (isLoadJornadas) return <DotsLoaders />;
	if (isErrJornada) return <Typography>Error al cargar jornadas</Typography>;

	return (
		<McAutocomplete
			label='Jornada'
			colLabel='nombre'
			value={jornada}
			options={data?.message?.data ?? []}
			isLoading={isLoadJornadas}
			isError={isErrJornada}
			setValue={setJornada}
		/>
	);
};

export default PickJornada;

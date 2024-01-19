import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch } from '@/hooks/useFetch';
import { TUser } from '@/models/Perfil';
import { Typography } from '@mui/material';
import React from 'react';

export type PickEvaluadorProps = {
	evaluador: TUser;
	ruta?: string;
	rol?: string;
	page?: string;
	status?: number;
	horario?: number;
	jornada?: number;
	setEvaluador: (evaluador: TUser) => void;
};

const PickEvaluador: React.FC<PickEvaluadorProps> = ({
	evaluador,
	ruta = 'all',
	rol = 'Docente',
	page = 'Punto de tesis',
	status = 1,
	horario,
	jornada,
	setEvaluador,
}) => {
	const {
		data: teachers,
		isLoading: isLoadingTeacher,
		isError: isErrorTeacher,
	} = useCustomFetch({
		url: `${URL.PROFESOR}/${ruta}`,
		method: 'get',
		params: {
			rol,
			page,
			status,
			horario,
			jornada,
		},
	});
	if (isLoadingTeacher) return <DotsLoaders />;
	if (isErrorTeacher)
		return <Typography>Error al cargar los docentes</Typography>;

	return (
		<McAutocomplete
			label='Docente'
			colLabel='nombre'
			value={evaluador}
			options={teachers}
			isLoading={isLoadingTeacher}
			isError={isErrorTeacher}
			setValue={setEvaluador}
		/>
	);
};

export default PickEvaluador;

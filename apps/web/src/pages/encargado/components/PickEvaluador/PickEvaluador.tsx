import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch } from '@/hooks/useFetch';
import { UserType } from '@/models/Perfil';
import { Typography } from '@mui/material';
import React from 'react';

export type PickEvaluadorProps = {
	evaluador: UserType;
	rol?: string;
	setEvaluador: (evaluador: UserType) => void;
};

const PickEvaluador: React.FC<PickEvaluadorProps> = ({
	evaluador,
	rol = 'Docente perfil',
	setEvaluador,
}) => {
	const {
		data: teachers,
		isLoading: isLoadingTeacher,
		isError: isErrorTeacher,
	} = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_usuarios',
			conditions: [
				{
					column: 'roles',
					operator: 'like',
					value: `%${rol}%`,
				},
			],
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

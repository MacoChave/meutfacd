import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { useCustomFetch } from '@/hooks/useFetch';
import { TCourseTutor } from '@/models/CourseTutor';
import { Typography } from '@mui/material';
import React from 'react';

export type PickCourseTutorProps = {
	course?: number;
	id_horario: number;
	id_jornada: number;
	courseTutor: TCourseTutor;
	setCourseTutor: (courseTutor: TCourseTutor) => void;
};

const PickCourseTutor: React.FC<PickCourseTutorProps> = ({
	course = 1,
	id_horario,
	id_jornada,
	courseTutor,
	setCourseTutor,
}) => {
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_curso_tutor',
		},
		params: {
			id_curso: course,
			id_horario,
			id_jornada,
		},
	});

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error al cargar los cursos</Typography>;
	return (
		<McAutocomplete
			label='Curso'
			colLabel='salon'
			value={courseTutor}
			options={data}
			isLoading={isLoading}
			isError={isError}
			setValue={setCourseTutor}
		/>
	);
};

export default PickCourseTutor;

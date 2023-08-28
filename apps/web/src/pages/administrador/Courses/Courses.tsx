import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { style } from '@/themes/styles';
import { Box } from '@mui/material';
import React from 'react';
import { Asignacion } from './Asignacion';
import { Gestion } from './Gestion';

export type CoursesProps = {};

const Courses: React.FC<CoursesProps> = ({}) => {
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_curso',
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<Contenedor title='Gestión de cursos'>
				<Box sx={style}>
					<Gestion />
					<Asignacion />
				</Box>
			</Contenedor>
		</>
	);
};

export default Courses;

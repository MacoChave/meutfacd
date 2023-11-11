import { style } from '@/themes/styles';
import { Box } from '@mui/material';
import React, { lazy } from 'react';
const Asignacion = lazy(() => import('./Asignacion/Asignacion'));
const Gestion = lazy(() => import('./Gestion/Gestion'));
const Contenedor = lazy(() => import('@/components/Contenedor/Contenedor'));
const DotsLoaders = lazy(
	() => import('@/components/Loader/DotsLoaders/DotsLoaders')
);

export type CoursesProps = {};

const Courses: React.FC<CoursesProps> = ({}) => {
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

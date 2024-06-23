import { style } from '@/themes/styles';
import { Search } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import React, { lazy, useState } from 'react';
const Asignacion = lazy(() => import('./Asignacion/Asignacion'));
const Gestion = lazy(() => import('./Gestion/Gestion'));
const Contenedor = lazy(() => import('@/components/Contenedor/Contenedor'));

export type CoursesProps = {};

const Courses: React.FC<CoursesProps> = ({}) => {
	const [filter, setFilter] = useState('');
	return (
		<>
			<Contenedor title='Gestión de cursos'>
				<Box sx={style}>
					<Gestion />
					<Box>
						<TextField
							label='Filtrar por nombre del curso, tutor o salón'
							variant='outlined'
							fullWidth
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							InputProps={{
								endAdornment: <Search />,
							}}
						/>
						<Asignacion filter={filter} />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Courses;

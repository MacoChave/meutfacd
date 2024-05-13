'use client';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { URL } from '@/consts/Api';
import { useCustomFetch, useFetch } from '@/hooks/useFetch';
import React, { useState } from 'react';

export type PickSeccionCourseProps = {
	course: number;
	section: string;
	setSection: (section: string) => void;
};

const PickSeccionCourse: React.FC<PickSeccionCourseProps> = ({
	course,
	section,
	setSection,
}) => {
	// const [selectedSeccion, setSelectedSeccion] = useState({} as any);
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.ASSIGNMENT}/details`,
		method: 'post',
		body: {
			conditions: [{ column: 'id_curso', value: course, operator: '=' }],
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<McAutocomplete
				value={section}
				options={data}
				label='Salón'
				colLabel='salon'
				isLoading={isLoading}
				isError={isError}
				setValue={setSection}
			/>
		</>
	);
};

export default PickSeccionCourse;

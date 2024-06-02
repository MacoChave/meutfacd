'use client';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { URL_V2 } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import React, { useState } from 'react';
import { FormUser } from '../FormUser';
import { Box } from '@mui/material';
import { UploadCSV } from '../UploadCSV';
import { TRol } from '@/models/Rol';

export type NewUserProps = {
	// types...
};

const NewUser: React.FC<NewUserProps> = ({}) => {
	const [curRol, setCurRol] = useState<TRol>({} as TRol);
	const { data, isLoading, isError } = useFetch({
		url: `${URL_V2.ROL}/all`,
		params: {},
	});

	return (
		<>
			<McAutocomplete
				label='Rol'
				options={data?.message ?? []}
				colLabel='nombre'
				value={curRol}
				setValue={setCurRol}
				isLoading={isLoading}
				isError={isError}
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: 2,
					pt: 2,
				}}>
				<UploadCSV
					id_rol={curRol.id_rol}
					style={{
						flex: 1,
						justifySelf: 'start',
						alignSelf: 'start',
					}}
				/>
				<FormUser
					id_rol={curRol.id_rol}
					style={{
						flex: 1,
					}}
				/>
			</Box>
		</>
	);
};

export default NewUser;

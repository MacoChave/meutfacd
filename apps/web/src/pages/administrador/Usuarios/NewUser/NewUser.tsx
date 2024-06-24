'use client';
import { McAutocomplete } from '@/components/McWithoutForms/McAutocomplete';
import { URL, URL_V2 } from '@/consts/Api';
import { useFetch } from '@/hooks/useFetch';
import React, { useState } from 'react';
import { FormUser } from '../FormUser';
import { Box } from '@mui/material';
import { UploadCSV } from '../UploadCSV';
import { TRol } from '@/models/Rol';

export type NewUserProps = {
	onClose: () => void;
};

const NewUser: React.FC<NewUserProps> = ({ onClose }) => {
	const [curRol, setCurRol] = useState<TRol>({} as TRol);
	const { data, isLoading, isError } = useFetch({
		url: `${URL.ROL}/all`,
		params: {},
	});

	return (
		<>
			<McAutocomplete
				label='Rol'
				options={data?.message?.data ?? []}
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
					flexWrap: 'wrap',
					gap: 2,
					pt: 2,
				}}>
				{/* TODO: FUNCTIONALITY NOT IMPLEMENTED YET */}
				{/* <UploadCSV
					id_rol={curRol.id_rol}
					style={{
						flex: 1,
						justifySelf: 'start',
						alignSelf: 'start',
					}}
				/> */}
				<FormUser
					id_rol={curRol.id_rol}
					style={{
						flex: 2,
					}}
					onClose={onClose}
				/>
			</Box>
		</>
	);
};

export default NewUser;

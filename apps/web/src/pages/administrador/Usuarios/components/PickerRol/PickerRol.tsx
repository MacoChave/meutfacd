import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const rolTypes = [
	{ value: 'super', label: 'Super administrador' },
	{ value: 'administrador', label: 'Administrador' },
	{ value: 'encargado', label: 'Encargado' },
	{ value: 'docente', label: 'Docente' },
	{ value: 'secretaria', label: 'Secretaría' },
	{ value: 'estudiante', label: 'Estudiante' },
];

export type PickerRolProps = {
	rootRol: string;
	onChangeRootRol: (rol: string) => void;
};

const PickerRol: React.FC<PickerRolProps> = ({ rootRol, onChangeRootRol }) => {
	return (
		<Autocomplete
			options={rolTypes}
			getOptionLabel={(option) => option.label}
			value={rolTypes.find((option) => option.value === rootRol) ?? null}
			onChange={(_event, newValue) => {
				onChangeRootRol(newValue?.value ?? '');
			}}
			renderInput={(params) => (
				<TextField {...params} label='Rol' variant='outlined' />
			)}
		/>
	);
};

export default PickerRol;

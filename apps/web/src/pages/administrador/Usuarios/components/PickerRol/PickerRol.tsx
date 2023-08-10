import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const rolTypes = [
	{ value: 'administrador', label: 'Administrador' },
	{ value: 'encargado', label: 'Encargado' },
	{ value: 'estudiante', label: 'Estudiante' },
	{ value: 'docente', label: 'Docente' },
	{ value: 'analitica', label: 'Analíca' },
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

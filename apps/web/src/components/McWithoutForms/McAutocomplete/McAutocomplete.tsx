import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export type McAutocompleteProps = {
	value: any;
	options: any[];
	label: string;
	colLabel: string;
	isLoading: boolean;
	isError: boolean;
	setValue: (value: any) => void;
};

const McAutocomplete: React.FC<McAutocompleteProps> = ({
	value,
	options,
	label,
	colLabel,
	isLoading,
	isError,
	setValue,
}) => {
	if (isLoading) return <p>Cargando...</p>;
	if (isError) return <p>Error</p>;

	return (
		<Autocomplete
			sx={{ width: 'inherit' }}
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue || {});
			}}
			options={options}
			getOptionLabel={(option) =>
				Object.keys(option).length > 0 ? option[colLabel] : ''
			}
			renderInput={(params) => (
				<TextField {...params} label={label} variant='filled' />
			)}
		/>
	);
};

export default McAutocomplete;

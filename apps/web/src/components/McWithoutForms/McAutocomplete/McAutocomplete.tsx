import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { Autocomplete, TextField, Typography } from '@mui/material';
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
	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

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
				<TextField {...params} label={label} variant='standard' />
			)}
		/>
	);
};

export default McAutocomplete;

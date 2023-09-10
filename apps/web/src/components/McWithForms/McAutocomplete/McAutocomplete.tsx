import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type Option = {
	id: any;
	label: string;
};

export type McAutocompleteProps = {
	control: Control<FieldValues>;
	name: Path<FieldValues>;
	options: Option[];
	label: string;
	disabled?: boolean;
};

const McAutocomplete: React.FC<McAutocompleteProps> = ({
	control,
	name,
	options = [],
	label,
	disabled = false,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => {
				const { value, onChange } = field;
				return (
					<Autocomplete
						options={options}
						value={
							value
								? options.find(
										(option: Option) => value === option.id
								  ) ?? null
								: null
						}
						disabled={disabled}
						getOptionLabel={(option: Option) => option?.label ?? ''}
						isOptionEqualToValue={(
							option: Option,
							value: Option
						) => {
							return value ? option.id === value.id : false;
						}}
						onChange={(_event, newValue) => {
							onChange(newValue ? newValue.id : null);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								variant='standard'
								label={label}
								error={!!error}
								helperText={error?.message ?? null}
							/>
						)}
					/>
				);
			}}
		/>
	);
};

export default McAutocomplete;

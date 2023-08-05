import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type McInputProps = {
	control: Control<FieldValues>;
	name: Path<FieldValues>;
	label: string;
};

const McInput: React.FC<McInputProps> = ({ control, name, label }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => {
				const { value, onChange } = field;
				return (
					<TextField
						{...field}
						variant='outlined'
						label={label}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						error={!!error}
						helperText={error?.message ?? null}
					/>
				);
			}}
		/>
	);
};

export default McInput;

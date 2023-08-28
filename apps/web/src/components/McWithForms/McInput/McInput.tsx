import { formatDateToInput } from '@/utils/formatHandler';
import { TextField } from '@mui/material';
import React, { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

export type McInputProps = {
	control: Control<FieldValues>;
	name: Path<FieldValues>;
	label: string;
	type?: HTMLInputTypeAttribute;
	disabled?: boolean;
	customChange?: (value: any) => void;
};

const McInput: React.FC<McInputProps> = ({
	control,
	name,
	label,
	type = 'text',
	disabled = false,
	customChange = undefined,
}) => {
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
						value={
							type === 'date' ? value.replace('/', '-') : value
						}
						type={type}
						onChange={(e) => {
							customChange
								? customChange(e)
								: onChange(e.target.value);
						}}
						disabled={disabled ?? false}
						error={!!error}
						helperText={error?.message ?? null}
					/>
				);
			}}
		/>
	);
};

export default McInput;

import { formatToInputDate } from '@/utils/formatHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { HTMLInputTypeAttribute, useState } from 'react';
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
	const [inputType, setInputType] = useState(type);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => {
				const { value, onChange } = field;
				return (
					<TextField
						{...field}
						sx={{ width: '100%', minWidth: { xs: '300px' } }}
						variant='standard'
						label={label}
						value={
							type === 'date' ? formatToInputDate(value) : value
						}
						type={inputType}
						onChange={(e) => {
							customChange
								? customChange(e)
								: onChange(e.target.value);
						}}
						disabled={disabled ?? false}
						error={!!error}
						helperText={error?.message ?? null}
						InputProps={{
							endAdornment: type === 'password' && (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() =>
											setInputType((prev) =>
												prev === 'password'
													? 'text'
													: 'password'
											)
										}>
										{inputType === 'password' ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				);
			}}
		/>
	);
};

export default McInput;

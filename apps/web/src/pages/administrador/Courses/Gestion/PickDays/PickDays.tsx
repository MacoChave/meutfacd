import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import React from 'react';

const daysWeek: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export type PickDaysProps = {
	days: string[];
	setDays: (days: string[]) => void;
	readOnly?: boolean;
};

const PickDays: React.FC<PickDaysProps> = ({
	days,
	readOnly = false,
	setDays,
}) => {
	return (
		<>
			<Box
				sx={{
					m: 'auto',
				}}>
				<Typography variant='body1'>Días a impartir</Typography>
				<ToggleButtonGroup
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
					value={days}
					color='primary'
					onChange={(event, newDays) => {
						setDays(newDays || []);
					}}>
					{daysWeek.map((day) => (
						<ToggleButton key={day} value={day} disabled={readOnly}>
							{' '}
							{day}{' '}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Box>
		</>
	);
};

export default PickDays;

import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import React from 'react';

const daysWeek: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export type PickDaysProps = {
	days: string[];
	setDays: (days: string[]) => void;
	readOnly?: boolean;
};

const PickDays: React.FC<PickDaysProps> = ({ days, readOnly = false, setDays }) => {
	return (
		<>
			<Typography variant='body1'>Días a impartir</Typography>
			<Box
				sx={{
					m: 'auto',
				}}>
				<ToggleButtonGroup
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

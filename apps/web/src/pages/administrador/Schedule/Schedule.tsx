import { Contenedor } from '@/components';
import React from 'react';
import { ScheduleData } from './ScheduleData';
import { PeriodData } from './PeriodData';
import { Box } from '@mui/material';

export type ScheduleProps = {};

const Schedule: React.FC<ScheduleProps> = ({}) => {
	return (
		<Contenedor title='Gestión de horarios'>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
					gap: 2,
				}}>
				<PeriodData />
				<ScheduleData />
			</Box>
		</Contenedor>
	);
};

export default Schedule;

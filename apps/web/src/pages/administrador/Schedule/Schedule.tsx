import { Contenedor } from '@/components';
import React, { useState } from 'react';
import { ScheduleData } from './ScheduleData';
import { PeriodData } from './PeriodData';
import { Box } from '@mui/material';

export type ScheduleProps = {};

const Schedule: React.FC<ScheduleProps> = ({}) => {
	const [reload, setReload] = useState<boolean>(false);

	return (
		<Contenedor title='Gestión de horarios'>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
					gap: 2,
				}}>
				<PeriodData reload={reload} setReload={setReload} />
				<ScheduleData reload={reload} setReload={setReload} />
			</Box>
		</Contenedor>
	);
};

export default Schedule;

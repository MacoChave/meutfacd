'use client';
import { Contenedor } from '@/components';
import { URL } from '@/consts/Api';
import { getData } from '@/services/fetching';
import { downloadFileByBloodPart } from '@/utils/fileManagment';
import { Download } from '@mui/icons-material';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Historial } from '../components/Historial';

export type ProgresosProps = {
	// types...
};

const Progresos: React.FC<ProgresosProps> = ({}) => {
	const [selectedMonth, setSelectedMonth] = useState(
		dayjs(new Date()).format('YYYY-MM')
	);
	const [selectedStation, setSelectedStation] = useState(undefined);

	const handleDownload = async () => {
		const data = await getData({
			path: `${URL.REVIEW}/xlsx`,
			params: {
				date: selectedMonth,
			},
			responseType: 'blob',
		});

		downloadFileByBloodPart(data as BlobPart, 'resumen.xlsx');
	};

	return (
		<>
			<Contenedor title='Progresos por ciclo / estación'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 4,
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							gap: 2,
						}}>
						<Box>
							<TextField
								label='Ciclo lectivo'
								type='month'
								value={selectedMonth}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => {
									setSelectedMonth(e.target.value);
								}}
							/>
						</Box>
						<Box sx={{ flex: 1 }} />
						<Box>
							<IconButton
								color='primary'
								title='Descargar XLSX'
								type='button'
								onClick={handleDownload}>
								<Download />
							</IconButton>
						</Box>
					</Box>
					<Divider />
					<Box>
						<Historial date={selectedMonth} />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Progresos;

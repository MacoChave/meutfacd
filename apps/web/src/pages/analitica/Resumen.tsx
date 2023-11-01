import { Contenedor } from '@/components';
import { Download } from '@mui/icons-material';
import { Box, Divider, IconButton, MenuItem, Select } from '@mui/material';
import { StationBox } from './StationBox';
import { useState } from 'react';
import {
	ESTACION1,
	ESTACION2,
	ESTACION3,
	ESTACION4,
	ESTACION5,
	ESTACION6,
} from '@/consts/vars';
import { getData } from '@/services/fetching';
import { URL } from '@/api/server';
import { downloadFileByBloodPart } from '@/utils/fileManagment';

const Resumen = () => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const handleDownload = async () => {
		const data = await getData({
			path: `${URL.REVIEW}/xlsx`,
			params: { year: currentYear },
			responseType: 'blob',
		});
		// DOWNLOAD XLSX FILE
		downloadFileByBloodPart(
			data as BlobPart,
			'Resumen por ciclo lectivo.xlsx',
			'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
	};

	const getYearRange = (begin: number, end: number) => {
		const years = [];
		for (let i = begin; i <= end; i++) {
			years.push(i);
		}
		return years;
	};

	return (
		<>
			<Contenedor title='Resumen por ciclo lectivo'>
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
							<Select
								variant='standard'
								label='Ciclo lectivo'
								defaultValue={currentYear}
								onChange={(e) =>
									setCurrentYear(e.target.value as number)
								}>
								{getYearRange(2020, 2030).map((year) => (
									<MenuItem key={year} value={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</Box>
						<Box>
							{/* <TextField
								variant='standard'
								label='Estudiantes atendidos'
								InputProps={{
									disabled: true,
								}}
							/> */}
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
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(300px, 1fr))',
							gap: 4,
						}}>
						<StationBox station={ESTACION1} />
						<StationBox station={ESTACION2} />
						<StationBox station={ESTACION3} />
						<StationBox station={ESTACION4} />
						<StationBox station={ESTACION5} />
						<StationBox station={ESTACION6} />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

const rows = [
	{
		estacion: 'Estacion 1',
		aprobados: 12,
		previo: 5,
		rechazos: 3,
	},
	{
		estacion: 'Estacion 2',
		aprobados: 12,
		previo: 0,
		rechazos: 5,
	},
	{
		estacion: 'Estacion 3',
		aprobados: 16,
		previo: 0,
		rechazos: 7,
	},
	{
		estacion: 'Estacion 4',
		aprobados: 11,
		previo: 10,
		rechazos: 5,
	},
	{
		estacion: 'Estacion 5',
		aprobados: 17,
		previo: 9,
		rechazos: 13,
	},
	{
		estacion: 'Impresiones',
		aprobados: 8,
		previo: 19,
		espera: 17,
	},
];

export default Resumen;

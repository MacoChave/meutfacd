import { Contenedor } from '@/components';
import { URL } from '@/consts/Api';
import {
	ESTACION1,
	ESTACION2,
	ESTACION3,
	ESTACION4,
	ESTACION5,
	ESTACION6,
} from '@/consts/Vars';
import { getData } from '@/services/fetching';
import { downloadFileByBloodPart } from '@/utils/fileManagment';
import { Download } from '@mui/icons-material';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import { lazy, useState } from 'react';
import dayjs from 'dayjs';
const StationBox = lazy(() => import('../components/StationBox/StationBox'));

const Resumen = () => {
	const [selectedMonth, setSelectedMonth] = useState(
		dayjs(new Date()).format('YYYY-MM')
	);

	const handleDownload = async () => {
		const data = await getData({
			path: `${URL.REVIEW}/xlsx`,
			params: { year: selectedMonth },
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
							{/* TextField type month */}
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
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(250px, 1fr))',
							gap: 4,
						}}>
						<StationBox station={ESTACION1} date={selectedMonth} />
						<StationBox station={ESTACION2} date={selectedMonth} />
						<StationBox station={ESTACION3} date={selectedMonth} />
						<StationBox station={ESTACION4} date={selectedMonth} />
						<StationBox station={ESTACION5} date={selectedMonth} />
						<StationBox station={ESTACION6} date={selectedMonth} />
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

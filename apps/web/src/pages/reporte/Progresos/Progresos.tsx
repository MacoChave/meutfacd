'use client';
import { Contenedor } from '@/components';
import { URL } from '@/consts/Api';
import { getData, postData } from '@/services/fetching';
import { downloadFileByBloodPart } from '@/utils/fileManagment';
import { Download } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Divider,
	IconButton,
	TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Historial } from '../components/Historial';
import { ESTACIONES, STATES } from '@/consts/Vars';
import { PickEvaluador } from '@/pages/encargado/components/PickEvaluador';
import { TUser } from '@/models/Perfil';

export type ProgresosProps = {
	// types...
};

const Progresos: React.FC<ProgresosProps> = ({}) => {
	const [selectedMonth, setSelectedMonth] = useState(
		dayjs(new Date()).format('YYYY-MM')
	);
	const [stationFilter, setStationFilter] = useState(ESTACIONES[0]);
	const [stateFilter, setStateFilter] = useState(STATES[0]);
	const [tutorFilter, setTutorFilter] = useState<TUser>({} as TUser);

	const handleDownload = async () => {
		const data = await postData({
			path: `${URL.REVIEW}/xlsx`,
			body: {
				conditions: [
					{
						column: 'fecha',
						operator: '>=',
						value: dayjs(selectedMonth)
							.startOf('month')
							.format('YYYY-MM-DD'),
					},
					{
						column: 'fecha',
						operator: '<=',
						value: dayjs(selectedMonth)
							.endOf('month')
							.format('YYYY-MM-DD'),
					},
					{
						column: 'estacion',
						operator: '=',
						value: ESTACIONES.indexOf(stationFilter) + 1,
					},
					{
						column: 'estado',
						operator: '=',
						value: stateFilter.value,
					},
					{
						column: 'id_tutor',
						operator: '=',
						value: tutorFilter.id_usuario ?? 0,
					},
				],
				condInclusives: true,
			},
			// params: {
			// 	fecha: selectedMonth,
			// },
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
						<Box>
							<Autocomplete
								sx={{ width: 200 }}
								options={ESTACIONES}
								getOptionLabel={(option) => option}
								value={stationFilter}
								onChange={(event, newValue) => {
									setStationFilter(newValue ?? stationFilter);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label='Estación'
										InputLabelProps={{
											shrink: true,
										}}
									/>
								)}
							/>
						</Box>
						<Box>
							<Autocomplete
								sx={{ width: 200 }}
								options={STATES}
								getOptionLabel={(option) => option.label}
								value={stateFilter}
								onChange={(event, newValue) => {
									setStateFilter(newValue ?? stateFilter);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label='Estado'
										InputLabelProps={{
											shrink: true,
										}}
									/>
								)}
							/>
						</Box>
						<Box>
							<PickEvaluador
								evaluador={tutorFilter}
								setEvaluador={(professor: TUser) => {
									setTutorFilter(professor);
								}}
								ruta='schedule'
								rol='Docente'
								page={stationFilter}
								status={1}
								horario={2}
								jornada={3}
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
						<Historial
							date={selectedMonth}
							station={ESTACIONES.indexOf(stationFilter) + 1}
							state={stateFilter.value}
							tutor={tutorFilter}
						/>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Progresos;

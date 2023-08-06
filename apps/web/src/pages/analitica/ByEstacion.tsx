import { Contenedor } from '@/components';
import { McTable } from '@/components/MyTable';
import { Download } from '@mui/icons-material';
import {
	Box,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { Cell, Legend, Pie, PieChart } from 'recharts';

const data = [
	{ name: 'Espera', value: 400 },
	{ name: 'Previa', value: 300 },
	{ name: 'Aprobado', value: 300 },
];

const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

const ByEstacion = () => {
	return (
		<>
			<Contenedor title='Reporte por estación'>
				<Box
					component='div'
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 2,
					}}>
					<Box component='div'>
						<FormControl fullWidth>
							<InputLabel>Estación</InputLabel>
							<Select variant='filled'>
								{[2020, 2021, 2022, 2023, 2024, 2025, 2026].map(
									(item) => (
										<MenuItem value={item} key={item}>
											{item}
										</MenuItem>
									)
								)}
							</Select>
						</FormControl>
						<PieChart width={400} height={400}>
							<Pie
								data={data}
								cx={200}
								cy={200}
								outerRadius={80}
								fill='#8884d8'
								label
								dataKey={'value'}>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Legend />
						</PieChart>
					</Box>
					<Box>
						<Box
							sx={{
								display: 'flex',
								gap: 4,
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}>
							<Typography>Descargar xlsx</Typography>
							<IconButton color='primary'>
								<Download />
							</IconButton>
						</Box>
						<McTable
							headers={{ name: 'Nombre', value: 'Valor' }}
							rows={data}
							totalCols={{}}
							onDelete={() => {}}
							onEdit={() => {}}
						/>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

const dataTable = [
	{
		estacion: 'Estación 1',
		estado: 'Espera',
		fecha: '2021-01-01',
		usuario: 'Usuario 1',
		evaluador: 'Evaluador 1',
	},
	{
		estacion: 'Estación 2',
		estado: 'Aprobado',
		fecha: '2021-01-01',
		usuario: 'Usuario 2',
		evaluador: 'Evaluador 2',
	},
	{
		estacion: 'Estación 3',
		estado: 'Previa',
		fecha: '2021-01-01',
		usuario: 'Usuario 3',
		evaluador: 'Evaluador 3',
	},
	{
		estacion: 'Estación 4',
		estado: 'Espera',
		fecha: '2021-01-01',
		usuario: 'Usuario 4',
		evaluador: 'Evaluador 4',
	},
	{
		estacion: 'Estación 5',
		estado: 'Aprobado',
		fecha: '2021-01-01',
		usuario: 'Usuario 5',
		evaluador: 'Evaluador 5',
	},
	{
		estacion: 'Estación 6',
		estado: 'Previa',
		fecha: '2021-01-01',
		usuario: 'Usuario 4',
		evaluador: 'Evaluador 6',
	},
	{
		estacion: 'Estación 7',
		estado: 'Espera',
		fecha: '2021-01-01',
		usuario: 'Usuario 2',
		evaluador: 'Evaluador 7',
	},
	{
		estacion: 'Estación 8',
		estado: 'Aprobado',
		fecha: '2021-01-01',
		usuario: 'Usuario 1',
		evaluador: 'Evaluador 8',
	},
	{
		estacion: 'Estación 9',
		estado: 'Previa',
		fecha: '2021-01-01',
		usuario: 'Usuario 3',
		evaluador: 'Evaluador 9',
	},
	{
		estacion: 'Estación 10',
		estado: 'Espera',
		fecha: '2021-01-01',
		usuario: 'Usuario 10',
		evaluador: 'Evaluador 10',
	},
];

export default ByEstacion;

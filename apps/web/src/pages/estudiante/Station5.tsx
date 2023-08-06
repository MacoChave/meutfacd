import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { useCustomFetch } from '@/hooks/useFetch';
import { style } from '@/themes/styles';
import { Box, TextField } from '@mui/material';

const boxStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: 4,
};

const Estacion5 = () => {
	const {
		data: revision,
		isLoading,
		isError,
	} = useCustomFetch({
		url: URL.THESIS.HISTORY,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'titulo',
				'fecha_revision',
				'detalle',
				'estado',
				'estacion',
			],
			order: {
				fecha_revision: 'DESC',
			},
			limit: 1,
		},
		params: {
			estacion: 2,
		},
	});

	console.log({ revision });

	return (
		<>
			<Contenedor title='Cita a previos internos'>
				<Box sx={style}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
						}}>
						<TextField
							variant='filled'
							label='Catedrático'
							value='Anselma León Teruel'
						/>
						<TextField
							variant='filled'
							label='Fecha'
							value='10-jun-2023'
						/>
						<TextField
							variant='filled'
							label='Horario'
							value='15:00'
						/>
						<TextField
							variant='filled'
							label='Salón'
							value='Edificio S6 - 300'
						/>
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion5;
import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { APROBADO } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { ProgressType } from '@/interfaces/ProgressType';
import { getData } from '@/services/fetching';
import { Typography } from '@mui/material';
import { useState } from 'react';
import swal from 'sweetalert';
import Dialogo from '../../components/Modal';

const Progress = () => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({} as ProgressType);
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.REVIEW}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'fecha_creacion',
				'fecha_modificacion',
				'ruta_dictamen',
				'fecha',
				'detalle',
				'tutor',
				'estado',
				'estacion',
				'titulo',
			],
			sort: {
				estacion: 'asc',
				fecha_creacion: 'asc',
			},
		},
	});

	const handleShow = (row: ProgressType) => {
		setOpen(true);
		setRow(row);
	};

	const handlePrint = async (row: Object) => {
		if ((row as ProgressType).estado !== APROBADO) {
			swal('Error', 'No hay documento dictámen para ver', 'error');
			return;
		}

		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: (row as ProgressType).ruta_dictamen },
		});
		window.open(url);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error al cargar los datos</Typography>;

	return (
		<>
			<Contenedor title='Mi progreso'>
				<McTable
					headers={{
						estacion: 'Estación',
						titulo: 'Titulo',
						detalle: 'Observación',
						tutor: 'Revisor',
						fecha_creacion: 'Creación',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
						estado: 'Estado',
					}}
					rows={data || []}
					totalCols={{}}
					onPrint={handlePrint}
				/>
			</Contenedor>
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				<Typography>{`Detalle de revisión`}</Typography>
			</Dialogo>
		</>
	);
};

export default Progress;

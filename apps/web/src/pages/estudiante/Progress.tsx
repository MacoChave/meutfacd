import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { ProgressType } from '@/interfaces/ProgressType';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Dialogo from '../../components/Modal';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';

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
				'fecha',
				'tutor',
				'estado',
				'estacion',
			],
		},
	});

	const handleShow = (row: ProgressType) => {
		setOpen(true);
		setRow(row);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error al cargar los datos</Typography>;

	return (
		<>
			<Contenedor title='Mi progreso'>
				<McTable
					headers={{
						estacion: 'Estación',
						tutor: 'Revisor',
						fecha_creacion: 'Creación',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
						estado: 'Estado',
					}}
					rows={data || []}
					totalCols={{}}
				/>
			</Contenedor>
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				<Typography>{`Detalle de revisión`}</Typography>
			</Dialogo>
		</>
	);
};

export default Progress;

import { Contenedor } from '@/components';
import { MyTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { Chip, Typography } from '@mui/material';
import { useState } from 'react';
import Dialogo from '../../components/Modal';
import { URL } from '@/api/server';
import { ProgressType } from '@/interfaces/ProgressType';

const Progress = () => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({} as ProgressType);
	const { data, isLoading, isError } = useCustomFetch({
		url: URL.GENERIC,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			columns: [
				'id_revision',
				'fecha_creacion',
				'fecha_modificacion',
				'fecha_revision',
				'estado',
				'estacion',
			],
		},
	});

	const handleShow = (row: ProgressType) => {
		setOpen(true);
		setRow(row);
	};

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error al cargar los datos</div>;

	return (
		<>
			<Contenedor title='Mi progreso'>
				<MyTable
					headers={{
						estacion: 'Estación',
						fecha_creacion: 'Creación',
						fecha_modificacion: 'Modificación',
						fecha_revision: 'Revisión',
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

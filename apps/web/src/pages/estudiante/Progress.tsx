import { Contenedor } from '@/components';
import { MyTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { Chip, Typography } from '@mui/material';
import { useState } from 'react';
import Dialogo from '../../components/Modal';
import { URL } from '@/api/server';
import { ProgressType } from '@/interfaces/ProgressType';

const getChipColor = (estado: string) => {
	switch (estado) {
		case 'Enviado':
			return 'primary';
		case 'Aprobado':
			return 'success';
		case 'Previo':
			return 'error';
	}
};

const chipsByState = (estado: string) => {
	return (
		<Chip sx={{ width: 100 }} label={estado} color={getChipColor(estado)} />
	);
};

const Progress = () => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({} as ProgressType);
	const { data, isLoading, error } = useCustomFetch({
		url: URL.TESIS.HISTORY,
		method: 'post',
		body: {
			columns: [
				'id_revision',
				'tutor',
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
	if (error) return <div>Error al cargar los datos</div>;

	return (
		<>
			<Contenedor title='Mi progreso'>
				<MyTable
					headers={{
						estacion: 'Estación',
						tutor: 'Evaluador',
						fecha_creacion: 'Creación',
						fecha_modifiacion: 'Modificación',
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

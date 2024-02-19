'use client';
import { Contenedor, DotsLoaders, McModal, McTable } from '@/components';
import { URL } from '@/consts/Api';
import { PENDIENTE, REVISION } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { TProgress } from '@/models/Progress';
import { Cita } from '@/pages/encargado/ReviewThesis/Cita';
import { Typography } from '@mui/material';
import React, { useState } from 'react';

export type PrintThesisProps = {
	// types...
};

const PrintThesis: React.FC<PrintThesisProps> = ({}) => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState<TProgress>({} as TProgress);

	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
			conditions: [
				{ column: 'estado', value: PENDIENTE, operator: '=' },
				{ column: 'estado', value: REVISION, operator: '=' },
			],
			sort: { fecha: 'DESC' },
		},
		params: {
			estacion: 8,
		},
	});

	const setReview = (item: any) => {
		setRow(item as TProgress);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
		setRow({} as TProgress);
		refetch();
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error...</Typography>;

	return (
		<>
			<Contenedor title='Solicitud de impresiones'>
				<McTable
					headers={{
						estado: 'Estado',
						nombre: 'Estudiante',
						detalle: 'Detalle',
						sala: 'Sala',
						fecha: 'Revisión',
					}}
					rows={data}
					totalCols={{}}
					onEdit={setReview}
				/>
			</Contenedor>
			<McModal title='Gestión de citas' open={open} onClose={onClose}>
				<Cita userProgress={row} onClose={onClose} estacion={8} />
			</McModal>
		</>
	);
};

export default PrintThesis;

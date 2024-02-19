'use client';
import { Contenedor, DotsLoaders, McModal, McTable } from '@/components';
import { URL } from '@/consts/Api';
import { ESPERA, PENDIENTE, REVISION } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { Cita } from '@/pages/encargado/ReviewThesis/Cita';
import { getData } from '@/services/fetching';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

type ProgressType = {
	estacion: string;
	evaluador: string;
	fecha_carga: string;
};

export type ReviewThesisProps = {
	// types...
};

const ReviewThesis: React.FC<ReviewThesisProps> = ({}) => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState<ProgressType>({} as ProgressType);

	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: {
			estado: REVISION,
			estacion: 6,
		},
	});

	const openPDF = async (item: any) => {
		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: item.ruta_tesis },
		});
		window.open(url);
	};

	const setReview = (item: any) => {
		setRow(item as ProgressType);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
		setRow({} as ProgressType);
		refetch();
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error...</Typography>;

	return (
		<>
			<Contenedor title='Previos internos'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 4,
					}}>
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
						onView={openPDF}
						onEdit={setReview}
					/>
				</Box>
			</Contenedor>
			<McModal title='Gestión de citas' open={open} onClose={onClose}>
				<Cita userProgress={row} onClose={onClose} estacion={6} />
			</McModal>
		</>
	);
};

export default ReviewThesis;

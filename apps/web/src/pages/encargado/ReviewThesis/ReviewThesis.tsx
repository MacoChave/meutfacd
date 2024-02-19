import { URL } from '@/consts/Api';
import { Contenedor, McModal } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { PENDIENTE, REVISION } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { getData } from '@/services/fetching';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Cita } from './Cita';
import { AsignReviewTutor } from './components/AsignReviewTutor';

type ProgressType = {
	estacion: string;
	evaluador: string;
	fecha_carga: string;
};

export type ReviewThesisResponsibleProps = {};

const ReviewThesisResponsible: React.FC<
	ReviewThesisResponsibleProps
> = ({}) => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState<ProgressType>({} as ProgressType);

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
					<AsignReviewTutor />
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

export default ReviewThesisResponsible;

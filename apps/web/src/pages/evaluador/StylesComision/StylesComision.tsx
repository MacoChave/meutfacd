import { URL as URI } from '@/api/server';
import { Contenedor, McModal } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { getData } from '@/services/fetching';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReviewDoc } from '../components/ReviewDoc';

export type StylesComisionProps = Record<string, never>;

const StylesComision: React.FC<StylesComisionProps> = ({}) => {
	const [openReview, setOpenReview] = useState(false);
	const [curReview, setCurReview] = useState({});
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URI.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: 'V', estacion: 5 },
	});

	const openPDF = async (item: any) => {
		const { url }: any = await getData({
			path: `${URI.STORAGE._}`,
			body: {},
			params: { name: item.ruta_tesis },
		});
		window.open(url);
	};

	const setReview = (item: any) => {
		setCurReview(item);
		setOpenReview(true);
	};

	const onClose = () => {
		setOpenReview(false);
		setCurReview({});
		refetch();
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			<Contenedor title='Revisar tesis por Comisión y estilos'>
				<McTable
					headers={{
						nombre: 'Estudiante',
						fecha_creacion: 'Inicio',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
					}}
					rows={data}
					totalCols={{}}
					onView={openPDF}
					onEdit={setReview}
				/>
			</Contenedor>
			<McModal
				title='Revisión de punto de tesis'
				open={openReview}
				onClose={onClose}>
				<ReviewDoc curReview={curReview} onClose={onClose} />
			</McModal>
		</>
	);
};

export default StylesComision;

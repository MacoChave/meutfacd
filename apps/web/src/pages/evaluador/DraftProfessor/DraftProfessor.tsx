import { URL as URI } from '@/api/server';
import { Contenedor, McModal } from '@/components';
import AgregarComentario from '@/components/FijarFecha';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { getData } from '@/services/fetching';
import React, { useState } from 'react';
import { ReviewDoc } from '../components/ReviewDoc';

export type DraftProfessorProps = Record<string, never>;

const DraftProfessor: React.FC<DraftProfessorProps> = ({}) => {
	const [openReview, setOpenReview] = useState(false);
	const [curReview, setCurReview] = useState({});
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URI.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: 'V', estacion: 1 },
	});

	const openPDF = async (item: any) => {
		const { url }: any = await getData({
			path: `${URI.STORAGE._}`,
			body: {},
			params: { name: item.ruta_perfil },
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

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<Contenedor title='Revisar punto de tesis'>
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

export default DraftProfessor;

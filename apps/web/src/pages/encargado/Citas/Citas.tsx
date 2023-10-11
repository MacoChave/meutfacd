import { URL } from '@/api/server';
import { useCustomFetch } from '@/hooks/useFetch';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import FijarFecha from '../../../components/Comentar';
import AgregarComentario from '../../../components/FijarFecha';
import Dialogo from '../../../components/Modal';
import { ESPERA } from '@/consts/vars';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { Comentar, Contenedor, McModal } from '@/components';
import { McTable } from '@/components/MyTable';
import { getData } from '@/services/fetching';

type ProgressType = {
	estacion: string;
	evaluador: string;
	fecha_carga: string;
};

enum Operation {
	RECALENDARIZAR = 'Recalendarizar',
	DESCARGAR = 'Descargar',
	COMENTAR = 'Comentar',
	APROBAR = 'Aprobar',
}

export type CitasProps = {};

const Citas: React.FC<CitasProps> = ({}) => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState<ProgressType>({} as ProgressType);

	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: {
			estado: ESPERA,
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
		setRow(item);
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
			<McModal title='Gestión de citas' open={open} onClose={onClose}>
				<FijarFecha />
				<AgregarComentario />
			</McModal>
		</>
	);
};

export default Citas;

import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import { APROBADO } from '@/consts/Vars';
import { useFetch } from '@/hooks/useFetch';
import { TProgress } from '@/models/Progress';
import { getData } from '@/services/fetching';
import { Typography } from '@mui/material';
import { FC, useState } from 'react';
import swal from 'sweetalert';
import Dialogo from '../../../components/Modal';

export type ProgressProps = {
	id_user?: number;
	title?: string;
};

const Progress: FC<ProgressProps> = ({
	id_user = undefined,
	title = 'Mi progreso',
}) => {
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({} as TProgress);

	const { data, isLoading, isError } = useFetch({
		name: 'reviews',
		url: `${URL.REVIEW}/all`,
		params: { id_user: id_user },
	});

	const handleShow = (row: TProgress) => {
		setOpen(true);
		setRow(row);
	};

	const handlePrint = async (row: Object) => {
		if ((row as TProgress).estado !== APROBADO) {
			swal('Error', 'No hay documento dictámen para ver', 'error');
			return;
		}

		const { url }: any = await getData({
			path: URL.STORAGE,
			body: {},
			params: { name: (row as TProgress).ruta_dictamen },
		});
		window.open(url);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error al cargar los datos</Typography>;

	return (
		<>
			<Contenedor title={title}>
				<McTable
					headers={{
						estacion: 'Estación',
						'tesis.titulo': 'Titulo',
						detalle: 'Observación',
						// tutor: 'Revisor',
						fecha_creacion: 'Creación',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
						estado: 'Estado',
					}}
					rows={data?.message ?? []}
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

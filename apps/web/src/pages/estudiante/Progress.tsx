import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { McTable } from '@/components/MyTable';
import { APROBADO } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { ProgressType } from '@/interfaces/ProgressType';
import { postData } from '@/services/fetching';
import { errorHandler } from '@/utils/errorHandler';
import { downloadFileByBloodPart } from '@/utils/fileManagment';
import { Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import Dialogo from '../../components/Modal';

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
				'detalle',
				'tutor',
				'estado',
				'estacion',
				'titulo',
			],
			sort: {
				estacion: 'asc',
				fecha_creacion: 'asc',
			},
		},
	});

	const handleShow = (row: ProgressType) => {
		setOpen(true);
		setRow(row);
	};

	const handlePrint = async (row: Object) => {
		if ((row as ProgressType).estado !== APROBADO) {
			swal('Error', 'No se puede generar el dictamen', 'error');
			return;
		}
		try {
			const data = await postData<any>({
				path: `${URL.PDF}/dictamen`,
				body: {
					nameEmisor: `Encargado de estación ${
						(row as ProgressType).estacion
					}`,
					nameReceiver: `${(row as ProgressType).id_estudiante}`,
					thesisTitle: `${(row as ProgressType).titulo}`,
					station: `${(row as ProgressType).estacion}`,
				},
				responseType: 'arraybuffer',
				headers: {
					Accept: 'application/pdf',
				},
			});
			downloadFileByBloodPart(data, 'dictamen.pdf');
		} catch (error) {
			errorHandler(error as AxiosError);
		} finally {
		}
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error al cargar los datos</Typography>;

	return (
		<>
			<Contenedor title='Mi progreso'>
				<McTable
					headers={{
						estacion: 'Estación',
						titulo: 'Titulo',
						detalle: 'Observación',
						tutor: 'Revisor',
						fecha_creacion: 'Creación',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
						estado: 'Estado',
					}}
					rows={data || []}
					totalCols={{}}
					onPrint={handlePrint}
				/>
			</Contenedor>
			<Dialogo open={open} title='Observaciones' setOpen={setOpen}>
				<Typography>{`Detalle de revisión`}</Typography>
			</Dialogo>
		</>
	);
};

export default Progress;

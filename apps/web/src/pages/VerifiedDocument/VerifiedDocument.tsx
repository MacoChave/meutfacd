import { URL } from '@/api/server';
import { Contenedor, ToolbarWithoutSesion } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { APROBADO } from '@/consts/vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { getData } from '@/services/fetching';
import { formatToInputDate } from '@/utils/formatHandler';
import { Box, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export type VerifiedDocumentProps = {};

const VerifiedDocument: React.FC<VerifiedDocumentProps> = ({}) => {
	const params = useParams();
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/public/one`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: {
			id_revision: params['reviewId'],
		},
	});
	const handlePrint = async () => {
		if (data.estado !== APROBADO) {
			swal('Error', 'No hay documento dictámen para ver', 'error');
			return;
		}

		const { url }: any = await getData({
			path: URL.STORAGE._,
			body: {},
			params: { name: data.ruta_dictamen },
		});
		window.open(url);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			<ToolbarWithoutSesion />
			<Toolbar sx={{ mb: 2 }} />
			<Contenedor title='Validando dictámen'>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fill, minmax(200px, 1fr))',
						gap: 2,
						width: '100%',
					}}>
					<TextField
						label='Detalle'
						value={data.detalle}
						InputProps={{
							disabled: true,
						}}
					/>
					<TextField
						label='Fecha de revisión'
						value={formatToInputDate(data.fecha)}
						type='date'
						InputProps={{
							disabled: true,
						}}
					/>
					<TextField
						label='Revisor'
						value={data.tutor}
						InputProps={{
							disabled: true,
						}}
					/>
					<TextField
						label='Título'
						value={data.titulo}
						InputProps={{
							disabled: true,
						}}
					/>
				</Box>
				{/* <IconButton
					color='primary'
					onClick={handlePrint}
					title='Descargar documento'>
					<Download />
				</IconButton> */}
			</Contenedor>
		</>
	);
};

export default VerifiedDocument;

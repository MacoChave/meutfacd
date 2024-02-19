import { URL } from '@/consts/Api';
import { APROBADO } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { getData } from '@/services/fetching';
import { formatToInputDate } from '@/utils/formatHandler';
import { Box, Button, TextField, Toolbar, Typography } from '@mui/material';
import { FC, lazy } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
const Contenedor = lazy(() => import('@/components/Contenedor/Contenedor'));
const ToolbarWithoutSesion = lazy(
	() =>
		import(
			'@/components/Layout/ToolbarWithoutSession/ToolbarWithoutSession'
		)
);
const DotsLoaders = lazy(
	() => import('@/components/Loader/DotsLoaders/DotsLoaders')
);

export type VerifiedDocumentProps = {};

const VerifiedDocument: FC<VerifiedDocumentProps> = ({}) => {
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
			path: URL.STORAGE,
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
						label='Estudiante'
						value={data.nombre}
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
					<Button
						color='primary'
						variant='contained'
						onClick={handlePrint}>
						Descargar documento
					</Button>
				</Box>
			</Contenedor>
		</>
	);
};

export default VerifiedDocument;

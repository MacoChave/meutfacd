import webpCourseAssign from '@/assets/webp/CourseAssignment.webp';
import webpDocAuth from '@/assets/webp/DocsAuth.webp';
import webpThesisPrintAuth from '@/assets/webp/ThesisPrintAuth.webp';
import imgHeader from '@/assets/webp/Header-Derecho-Cloud.webp';
import { Footer } from '@/components/Layout/Footer';
import { Box, Typography } from '@mui/material';
import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
const InfoEstacion = lazy(
	() => import('./components/InfoEstacion/InfoEstacion')
);
const SesionMenu = lazy(() => import('./components/SesionMenu/SesionMenu'));

const Home = (props: any) => {
	const navigate = useNavigate();
	const {} = useFetch({
		url: 'api/ping',
	});

	const handleLogin = (rol: string) => {
		navigate(`/login/${rol}`);
	};

	const handleLogup = (rol: string) => {
		navigate(`/logup/${rol}`);
	};

	return (
		<Box sx={{ maxWidth: '100dvw' }}>
			<Box sx={{ width: '100%' }}>
				<picture>
					<source srcSet={imgHeader} type='image/webp' />
					<img
						style={{
							width: '100%',
							height: 'auto',
							objectFit: 'cover',
						}}
						src={imgHeader}
						alt='Derecho header'
						loading='lazy'
					/>
				</picture>
			</Box>
			<Box sx={{ textAlign: 'right' }}>
				<SesionMenu
					handleLogin={handleLogin}
					handleLogup={handleLogup}
				/>
			</Box>
			<Box>
				<Box sx={{ py: 4, textAlign: 'center' }}>
					<Typography
						variant='h2'
						sx={{ textTransform: 'uppercase' }}>
						Unidad de tesis
					</Typography>
					<Typography variant='h4'>Flujo de procesos</Typography>
				</Box>
				<InfoEstacion
					title='Recepción de punto de tesis'
					webp={webpDocAuth}
					jpg={webpDocAuth}
					alt='Flujo del proceso de recepción del punto de tesis'
				/>
				<InfoEstacion
					title='Curso'
					subtitle='Inducción a la planeación científica'
					webp={webpCourseAssign}
					jpg={webpCourseAssign}
					alt='Flujo del proceso del curso inducción a la planeación científica'
				/>
				<InfoEstacion
					title='Curso'
					subtitle='Elaboración y presentación de tesis'
					webp={webpCourseAssign}
					jpg={webpCourseAssign}
					alt='Flujo del proceso del curso elaboración y presentación de tesis'
				/>
				<InfoEstacion
					title='Comisión y estilo'
					webp={webpDocAuth}
					jpg={webpDocAuth}
					alt='Flujo del proceso de comisión y estilo'
				/>
				<InfoEstacion
					title='Previos internos'
					webp={webpDocAuth}
					jpg={webpDocAuth}
					alt='Flujo del proceso de previos internos'
				/>
				<InfoEstacion
					title='Finalización del proceso'
					webp={webpThesisPrintAuth}
					jpg={webpThesisPrintAuth}
					alt='Flujo del proceso de finalización del proceso'
				/>
			</Box>
			<Footer />
		</Box>
	);
};

export default Home;

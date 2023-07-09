import { ErrorPage } from '@/pages/ErrorPage';
import { Login, Recuperar } from '@/pages/Sesion';
import { Logup } from '@/pages/Sesion/Logup';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home/Home';
import Perfil from '../pages/Sesion/Profile';
import HomeAdministrador from '../pages/administrador';
import Actividades from '../pages/administrador/Actividades';
import Aplicacion from '../pages/administrador/Aplicacion';
import Permisos from '../pages/administrador/Permisos';
import Problemas from '../pages/administrador/Problemas';
import Usuarios from '../pages/administrador/Usuarios';
import HomeReporte from '../pages/analitica';
import ByEstacion from '../pages/analitica/ByEstacion';
import ByRol from '../pages/analitica/ByRol';
import Resumen from '../pages/analitica/Resumen';
import HomeEncargado from '../pages/encargado';
import Asignar from '../pages/encargado/Asignar';
import Citas from '../pages/encargado/Citas';
import HomeEstudiante from '../pages/estudiante';
import Progress from '../pages/estudiante/Progress';
import Estacion1 from '../pages/estudiante/Station1';
import Estacion2 from '../pages/estudiante/Station2';
import Estacion3 from '../pages/estudiante/Station3';
import Estacion4 from '../pages/estudiante/Station4';
import Estacion5 from '../pages/estudiante/Station5';
import HomeEvaluador from '../pages/evaluador';
import RevisionCurso from '../pages/evaluador/RevisionCurso';
import RevisionDocumento from '../pages/evaluador/RevisionDoc';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: (
			<ErrorPage
				codigo={404}
				mensaje='Intentaste entrar a alguna ruta o vienes de un error. De cualquier manera, intenta usar la navegación'
			/>
		),
	},
	{
		path: '/login/:rol',
		element: <Login />,
	},
	{
		path: '/logup/:rol',
		element: <Logup />,
	},
	{
		path: '/recuperar',
		element: <Recuperar />,
	},
	{
		path: '/estudiante',
		element: (
			<ProtectedRoute rol='estudiante'>
				{<HomeEstudiante />}
			</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='estudiante'>
						<Perfil />
					</ProtectedRoute>
				),
			},
			{
				path: 'progreso',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Progress />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion1',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion1 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion2',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion2 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion3',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion3 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion4',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion4 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion5',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion5 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'finalizar',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion5 />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/encargado/:estacion',
		element: (
			<ProtectedRoute rol='encargado'>{<HomeEncargado />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='encargado'>
						<Perfil />
					</ProtectedRoute>
				),
			},
			{
				path: 'asignar',
				element: (
					<ProtectedRoute rol='encargado'>
						{<Asignar />}
					</ProtectedRoute>
				),
			},
			{
				path: 'citas',
				element: (
					<ProtectedRoute rol='encargado'>{<Citas />}</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/evaluador',
		element: (
			<ProtectedRoute rol='profesor'>{<HomeEvaluador />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='profesor'>
						<Perfil />
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion1',
				element: (
					<ProtectedRoute rol='profesor'>
						{<RevisionDocumento />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion2',
				element: (
					<ProtectedRoute rol='profesor'>
						{<RevisionCurso />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion3',
				element: (
					<ProtectedRoute rol='profesor'>
						{<RevisionCurso />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion4',
				element: (
					<ProtectedRoute rol='profesor'>
						{<RevisionDocumento />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/analitica',
		element: (
			<ProtectedRoute rol='analitica'>{<HomeReporte />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='analitica'>
						<Perfil />
					</ProtectedRoute>
				),
			},
			{
				path: 'resumen',
				element: (
					<ProtectedRoute rol='analitica'>
						{<Resumen />}
					</ProtectedRoute>
				),
			},
			{
				path: 'por-estacion',
				element: (
					<ProtectedRoute rol='analitica'>
						{<ByEstacion />}
					</ProtectedRoute>
				),
			},
			{
				path: 'por-rol',
				element: (
					<ProtectedRoute rol='analitica'>{<ByRol />}</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/administrador',
		element: (
			<ProtectedRoute rol='administrador'>
				{<HomeAdministrador />}
			</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='administrador'>
						<Perfil />
					</ProtectedRoute>
				),
			},
			{
				path: 'usuarios',
				element: (
					<ProtectedRoute rol='administrador'>
						<Usuarios />
					</ProtectedRoute>
				),
			},
			{
				path: 'permisos',
				element: (
					<ProtectedRoute rol='administrador'>
						<Permisos />
					</ProtectedRoute>
				),
			},
			{
				path: 'actividades',
				element: (
					<ProtectedRoute rol='administrador'>
						<Actividades />
					</ProtectedRoute>
				),
			},
			{
				path: 'aplicacion',
				element: (
					<ProtectedRoute rol='administrador'>
						<Aplicacion />
					</ProtectedRoute>
				),
			},
			{
				path: 'problemas',
				element: (
					<ProtectedRoute rol='administrador'>
						<Problemas />
					</ProtectedRoute>
				),
			},
		],
	},
]);

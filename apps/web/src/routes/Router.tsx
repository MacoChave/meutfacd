import { ErrorPage } from '@/pages/ErrorPage';
import { Login } from '@/pages/Sesion';
import { Logup } from '@/pages/Sesion/Logup';
import { UserRecovery } from '@/pages/Sesion/UserRecovery';
import { Courses } from '@/pages/administrador/Courses';
import { PagesApp } from '@/pages/administrador/PagesApp';
import { Draft } from '@/pages/encargado/Draft';
import { FstCourse } from '@/pages/encargado/FstCourse';
import { ScndCourse } from '@/pages/encargado/ScndCourse';
import { ThesisSup } from '@/pages/encargado/ThesisSup';
import { Course1Professor } from '@/pages/evaluador/Course1Professor';
import { DraftProfessor } from '@/pages/evaluador/DraftProfessor';
import { SndCourseD } from '@/pages/evaluador/SndCourseD';
import { StylesComision } from '@/pages/evaluador/StylesComision';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home/Home';
import UserProfile from '../pages/Sesion/UserProfile/UserProfile';
import HomeAdministrador from '../pages/administrador';
import Aplicacion from '../pages/administrador/Aplicacion';
import Problemas from '../pages/administrador/Problemas';
import Usuarios from '../pages/administrador/Usuarios/Usuarios';
import HomeReporte from '../pages/analitica';
import ByEstacion from '../pages/analitica/ByEstacion';
import ByRol from '../pages/analitica/ByRol';
import Resumen from '../pages/analitica/Resumen';
import HomeEncargado from '../pages/encargado';
import Citas from '../pages/encargado/Citas/Citas';
import HomeEstudiante from '../pages/estudiante';
import Progress from '../pages/estudiante/Progress';
import Estacion1 from '../pages/estudiante/Station1';
import Estacion2 from '../pages/estudiante/Station2';
import Estacion3 from '../pages/estudiante/Station3';
import Estacion4 from '../pages/estudiante/Station4';
import Estacion5 from '../pages/estudiante/Station5';
import HomeEvaluador from '../pages/evaluador';
import { Dictamen } from '@/pages/estudiante/Dictamen';

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
		path: '/recovery/:rol',
		element: <UserRecovery />,
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
						<UserProfile />
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
				path: 'punto-tesis',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion1 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-introduccion',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion2 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-elaboracion',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion3 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'dictamen',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Dictamen />}
					</ProtectedRoute>
				),
			},
			{
				path: 'tesis',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion4 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'previos-internos',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion5 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'finalizacion',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<Estacion5 />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/encargado/',
		element: (
			<ProtectedRoute rol='encargado'>{<HomeEncargado />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='encargado'>
						<UserProfile />
					</ProtectedRoute>
				),
			},
			{
				path: 'punto-tesis',
				element: (
					<ProtectedRoute rol='encargado'>
						<Draft />
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-introduccion',
				element: (
					<ProtectedRoute rol='encargado'>
						{<FstCourse />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-elaboracion',
				element: (
					<ProtectedRoute rol='encargado'>
						{<ScndCourse />}
					</ProtectedRoute>
				),
			},
			{
				path: 'tesis',
				element: (
					<ProtectedRoute rol='encargado'>
						{<ThesisSup />}
					</ProtectedRoute>
				),
			},
			{
				path: 'previos-internos',
				element: (
					<ProtectedRoute rol='encargado'>{<Citas />}</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/docente',
		element: (
			<ProtectedRoute rol='profesor'>{<HomeEvaluador />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute rol='profesor'>
						<UserProfile />
					</ProtectedRoute>
				),
			},
			{
				path: 'punto-tesis',
				element: (
					<ProtectedRoute rol='profesor'>
						{<DraftProfessor />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-introduccion',
				element: (
					<ProtectedRoute rol='profesor'>
						{<Course1Professor />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-elaboracion',
				element: (
					<ProtectedRoute rol='profesor'>
						{<SndCourseD />}
					</ProtectedRoute>
				),
			},
			{
				path: 'tesis',
				element: (
					<ProtectedRoute rol='profesor'>
						{<StylesComision />}
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
						<UserProfile />
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
						<UserProfile />
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
				path: 'paginas',
				element: (
					<ProtectedRoute rol='administrador'>
						<PagesApp />
					</ProtectedRoute>
				),
			},
			{
				path: 'cursos',
				element: (
					<ProtectedRoute rol='administrador'>
						<Courses />
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

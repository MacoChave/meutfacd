import { Contenedor } from '@/components';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ErrorPage'));
const Login = lazy(() => import('@/pages/Sesion/Login/Login'));
const Logup = lazy(() => import('@/pages/Sesion/Logup/Logup'));
const UserRecovery = lazy(
	() => import('@/pages/Sesion/UserRecovery/UserRecovery')
);
const Courses = lazy(() => import('@/pages/administrador/Courses/Courses'));
const PagesApp = lazy(() => import('@/pages/administrador/PagesApp/PagesApp'));
const Draft = lazy(() => import('@/pages/encargado/Draft/Draft'));
const FstCourse = lazy(() => import('@/pages/encargado/FstCourse/FstCourse'));
const ScndCourse = lazy(
	() => import('@/pages/encargado/ScndCourse/ScndCourse')
);
const ThesisSup = lazy(() => import('@/pages/encargado/ThesisSup/ThesisSup'));
const Dictamen = lazy(() => import('@/pages/estudiante/Dictamen/Dictamen'));
const Course1Professor = lazy(
	() => import('@/pages/evaluador/Course1Professor/Course1Professor')
);
const DraftProfessor = lazy(
	() => import('@/pages/evaluador/DraftProfessor/DraftProfessor')
);
const SndCourseD = lazy(
	() => import('@/pages/evaluador/SndCourseD/SndCourseD')
);
const StylesComision = lazy(
	() => import('@/pages/evaluador/StylesComision/StylesComision')
);
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'));
const Home = lazy(() => import('../pages/Home/Home'));
const UserProfile = lazy(
	() => import('../pages/Sesion/UserProfile/UserProfile')
);
const HomeAdministrador = lazy(() => import('../pages/administrador'));
const Aplicacion = lazy(() => import('../pages/administrador/Aplicacion'));
const Problemas = lazy(() => import('../pages/administrador/Problemas'));
const Usuarios = lazy(() => import('../pages/administrador/Usuarios/Usuarios'));
const HomeReporte = lazy(() => import('../pages/analitica'));
const ByEstacion = lazy(() => import('../pages/analitica/ByEstacion'));
const ByRol = lazy(() => import('../pages/analitica/ByRol'));
const Resumen = lazy(() => import('../pages/analitica/Resumen'));
const HomeEncargado = lazy(() => import('../pages/encargado'));
const Citas = lazy(() => import('../pages/encargado/Citas/Citas'));
const HomeEstudiante = lazy(() => import('../pages/estudiante'));
const Progress = lazy(() => import('../pages/estudiante/Progress'));
const Estacion1 = lazy(() => import('../pages/estudiante/Station1'));
const Estacion2 = lazy(() => import('../pages/estudiante/Station2'));
const Estacion3 = lazy(() => import('../pages/estudiante/Station3'));
const Estacion4 = lazy(() => import('../pages/estudiante/Station4'));
const Estacion5 = lazy(() => import('../pages/estudiante/Station5'));
const HomeEvaluador = lazy(() => import('../pages/evaluador'));

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

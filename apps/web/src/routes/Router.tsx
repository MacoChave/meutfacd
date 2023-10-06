import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
// PAGES WITHOUT SESSIONS
const Login = lazy(() => import('@/pages/Sesion/Login/Login'));
const Logup = lazy(() => import('@/pages/Sesion/Logup/Logup'));
const VerifiedEmail = lazy(
	() => import('@/pages/Sesion/VerifiedEmail/VerifiedEmail')
);
const UserRecovery = lazy(
	() => import('@/pages/Sesion/UserRecovery/UserRecovery')
);
const VerifiedDocument = lazy(
	() => import('@/pages/VerifiedDocument/VerifiedDocument')
);
// PAGES WITH SESSIONS
const Home = lazy(() => import('../pages/Home/Home'));
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'));
const UserProfile = lazy(
	() => import('../pages/Sesion/UserProfile/UserProfile')
);
const Chat = lazy(() => import('../pages/Chat/Chat'));
// STUDENT PAGES
const HomeStudent = lazy(() => import('../pages/estudiante'));
const Progress = lazy(() => import('../pages/estudiante/Progress'));
const DrawStudent = lazy(() => import('../pages/estudiante/Station1'));
const FstCourseStudent = lazy(() => import('../pages/estudiante/Station2'));
const SndCourseStudent = lazy(() => import('../pages/estudiante/Station3'));
const ChangeStudent = lazy(
	() => import('@/pages/estudiante/Dictamen/Dictamen')
);
const ThesisStudent = lazy(() => import('../pages/estudiante/Station4'));
const IntPreviewStudent = lazy(() => import('../pages/estudiante/Station5'));
const PrintRequest = lazy(() => import('@/pages/estudiante/Finalizar'));
// PROFESSOR PAGES
const HomeProfessor = lazy(() => import('../pages/evaluador'));
const DraftProfessor = lazy(
	() => import('@/pages/evaluador/DraftProfessor/DraftProfessor')
);
const FstCourseProfessor = lazy(
	() => import('@/pages/evaluador/Course1Professor/Course1Professor')
);
const SndCourseProfessor = lazy(
	() => import('@/pages/evaluador/SndCourseD/SndCourseD')
);
const ThesisProfessor = lazy(
	() => import('@/pages/evaluador/StylesComision/StylesComision')
);
// COORDINATOR PAGES
const HomeResponsible = lazy(() => import('../pages/encargado'));
const DraftResponsible = lazy(() => import('@/pages/encargado/Draft/Draft'));
const FstCourseResponsible = lazy(
	() => import('@/pages/encargado/FstCourse/FstCourse')
);
const SndCourseResponsible = lazy(
	() => import('@/pages/encargado/ScndCourse/ScndCourse')
);
const ThesisResponsible = lazy(
	() => import('@/pages/encargado/ThesisSup/ThesisSup')
);
const IntpreviewResponsible = lazy(
	() => import('../pages/encargado/Citas/Citas')
);
// ANALYTICS PAGES
const HomeAnalitycs = lazy(() => import('../pages/analitica'));
const ByEstacion = lazy(() => import('../pages/analitica/ByEstacion'));
const ByRol = lazy(() => import('../pages/analitica/ByRol'));
const Resumen = lazy(() => import('../pages/analitica/Resumen'));
// ADMINISTRATOR PAGES
const HomeAdmin = lazy(() => import('../pages/administrador'));
const PagesApp = lazy(() => import('@/pages/administrador/PagesApp/PagesApp'));
const UsersApp = lazy(() => import('../pages/administrador/Usuarios/Usuarios'));
const Courses = lazy(() => import('@/pages/administrador/Courses/Courses'));
const Schedule = lazy(() => import('@/pages/administrador/Schedule/Schedule'));
const Aplicacion = lazy(() => import('../pages/administrador/Aplicacion'));
const ProblemsApp = lazy(() => import('../pages/administrador/Problemas'));
// ERROR PAGES
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ErrorPage'));

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
		path: '/verify-email/:email',
		element: <VerifiedEmail />,
	},
	{
		path: '/verify-document/:reviewId',
		element: <VerifiedDocument />,
	},
	{
		path: '/recovery/:rol',
		element: <UserRecovery />,
	},
	{
		path: '/estudiante',
		element: (
			<ProtectedRoute rol='estudiante'>{<HomeStudent />}</ProtectedRoute>
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
				path: 'chat',
				element: (
					<ProtectedRoute rol='estudiante'>{<Chat />}</ProtectedRoute>
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
						{<DrawStudent />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-introduccion',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<FstCourseStudent />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-elaboracion',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<SndCourseStudent />}
					</ProtectedRoute>
				),
			},
			{
				path: 'dictamen',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<ChangeStudent />}
					</ProtectedRoute>
				),
			},
			{
				path: 'tesis',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<ThesisStudent />}
					</ProtectedRoute>
				),
			},
			{
				path: 'previos-internos',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<IntPreviewStudent />}
					</ProtectedRoute>
				),
			},
			{
				path: 'finalizacion',
				element: (
					<ProtectedRoute rol='estudiante'>
						{<PrintRequest />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/encargado/',
		element: (
			<ProtectedRoute rol='encargado'>
				{<HomeResponsible />}
			</ProtectedRoute>
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
				path: 'chat',
				element: (
					<ProtectedRoute rol='encargado'>{<Chat />}</ProtectedRoute>
				),
			},
			{
				path: 'punto-tesis',
				element: (
					<ProtectedRoute rol='encargado'>
						<DraftResponsible />
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-introduccion',
				element: (
					<ProtectedRoute rol='encargado'>
						{<FstCourseResponsible />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-elaboracion',
				element: (
					<ProtectedRoute rol='encargado'>
						{<SndCourseResponsible />}
					</ProtectedRoute>
				),
			},
			{
				path: 'tesis',
				element: (
					<ProtectedRoute rol='encargado'>
						{<ThesisResponsible />}
					</ProtectedRoute>
				),
			},
			{
				path: 'previos-internos',
				element: (
					<ProtectedRoute rol='encargado'>
						{<IntpreviewResponsible />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/docente',
		element: (
			<ProtectedRoute rol='profesor'>{<HomeProfessor />}</ProtectedRoute>
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
				path: 'chat',
				element: (
					<ProtectedRoute rol='profesor'>{<Chat />}</ProtectedRoute>
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
						{<FstCourseProfessor />}
					</ProtectedRoute>
				),
			},
			{
				path: 'curso-elaboracion',
				element: (
					<ProtectedRoute rol='profesor'>
						{<SndCourseProfessor />}
					</ProtectedRoute>
				),
			},
			{
				path: 'tesis',
				element: (
					<ProtectedRoute rol='profesor'>
						{<ThesisProfessor />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/analitica',
		element: (
			<ProtectedRoute rol='analitica'>{<HomeAnalitycs />}</ProtectedRoute>
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
				path: 'chat',
				element: (
					<ProtectedRoute rol='analitica'>{<Chat />}</ProtectedRoute>
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
			<ProtectedRoute rol='administrador'>{<HomeAdmin />}</ProtectedRoute>
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
				path: 'chat',
				element: (
					<ProtectedRoute rol='administrador'>
						{<Chat />}
					</ProtectedRoute>
				),
			},
			{
				path: 'usuarios',
				element: (
					<ProtectedRoute rol='administrador'>
						<UsersApp />
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
				path: 'horarios',
				element: (
					<ProtectedRoute rol='administrador'>
						<Schedule />
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
						<ProblemsApp />
					</ProtectedRoute>
				),
			},
		],
	},
]);

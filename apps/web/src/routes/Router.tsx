import Dashboard from '@/components/Layout/Dashboard/Dashboard';
import { AproveThesis } from '@/pages/administrador/AproveThesis';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
// --------------------
// PAGES WITHOUT SESSIONS
// --------------------
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
// --------------------
// PAGES WITH SESSIONS
// --------------------
const Home = lazy(() => import('../pages/Home/Home'));
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'));
const UserProfile = lazy(
	() => import('../pages/Sesion/UserProfile/UserProfile')
);
const Chat = lazy(() => import('../pages/Chat/Chat'));
// --------------------
// STUDENT PAGES
// --------------------
const StudentHome = lazy(() => import('../pages/estudiante'));
const StudentProgress = lazy(
	() => import('../pages/estudiante/Progress/Progress')
);
const StudentThesisCover = lazy(
	() => import('../pages/estudiante/ThesisCover/ThesisCover')
);
const StudentCourseI = lazy(
	() => import('../pages/estudiante/CourseI/CourseI')
);
const StudentCourseII = lazy(
	() => import('../pages/estudiante/CourseII/CourseII')
);
const StudentThemeChange = lazy(
	() => import('@/pages/estudiante/TopicChange/TopicChange')
);
const StudentCommissionStyle = lazy(
	() => import('../pages/estudiante/CommisionStyle/CommissionStyle')
);
const StudentInternaReviews = lazy(
	() => import('../pages/estudiante/InternalReviews/InternalReviews')
);
const StudentPrintingRequest = lazy(
	() => import('@/pages/estudiante/PrintingRequest/PrintingRequest')
);
const StudentPrintedThesis = lazy(
	() => import('@/pages/estudiante/PrintedThesis/PrintedThesis')
);
// --------------------
// PROFESSOR PAGES
// --------------------
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
// --------------------
// COORDINATOR PAGES
// --------------------
const HomeResponsible = lazy(() => import('../pages/encargado'));
const DraftResponsible = lazy(() => import('@/pages/encargado/Draft/Draft'));
const FstCourseResponsible = lazy(
	() => import('@/pages/encargado/FstCourse/FstCourse')
);
const StudentTutor = lazy(
	() => import('@/pages/encargado/StudentTutor/StudentTutor')
);
const SndCourseResponsible = lazy(
	() => import('@/pages/encargado/ScndCourse/ScndCourse')
);
const ThesisResponsible = lazy(
	() => import('@/pages/encargado/ThesisSup/ThesisSup')
);
const ReviewThesisResponsible = lazy(
	() => import('../pages/encargado/ReviewThesis/ReviewThesis')
);
// --------------------
// ANALYTICS PAGES
// --------------------
const HomeAnalitycs = lazy(() => import('../pages/analitica'));
const ByEstacion = lazy(() => import('../pages/analitica/ByEstacion'));
const ByRol = lazy(() => import('../pages/analitica/ByRol'));
const Resumen = lazy(() => import('../pages/analitica/Resumen'));
// --------------------
// ADMINISTRATOR PAGES
// --------------------
const HomeAdmin = lazy(() => import('../pages/administrador'));
const PagesApp = lazy(() => import('@/pages/administrador/PagesApp/PagesApp'));
const UsersApp = lazy(() => import('../pages/administrador/Usuarios/Usuarios'));
const Courses = lazy(() => import('@/pages/administrador/Courses/Courses'));
const Schedule = lazy(() => import('@/pages/administrador/Schedule/Schedule'));
const Aplicacion = lazy(() => import('../pages/administrador/Aplicacion'));
const ProblemsApp = lazy(() => import('../pages/administrador/Problemas'));
// --------------------
// ERROR PAGES
// --------------------
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ErrorPage'));

export const router = createBrowserRouter(
	[
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
			path: '/recovery/:email',
			element: <UserRecovery />,
		},
		{
			path: '/estudiante',
			element: (
				<ProtectedRoute rol='estudiante'>
					{<Dashboard />}
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
					path: 'chat',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<Chat />}
						</ProtectedRoute>
					),
				},
				{
					path: 'progreso',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentProgress />}
						</ProtectedRoute>
					),
				},
				{
					path: 'punto-tesis',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentThesisCover />}
						</ProtectedRoute>
					),
				},
				{
					path: 'curso-introduccion',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentCourseI />}
						</ProtectedRoute>
					),
				},
				{
					path: 'curso-elaboracion',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentCourseII />}
						</ProtectedRoute>
					),
				},
				{
					path: 'dictamen',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentThemeChange />}
						</ProtectedRoute>
					),
				},
				{
					path: 'tesis',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentCommissionStyle />}
						</ProtectedRoute>
					),
				},
				{
					path: 'previos-internos',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentInternaReviews />}
						</ProtectedRoute>
					),
				},
				{
					path: 'finalizacion',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentPrintingRequest />}
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
						<ProtectedRoute rol='encargado'>
							{<Chat />}
						</ProtectedRoute>
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
					path: 'tutor-estudiante',
					element: (
						<ProtectedRoute rol='encargado'>
							{<StudentTutor />}
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
							{<ReviewThesisResponsible />}
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/docente',
			element: (
				<ProtectedRoute rol='profesor'>
					{<HomeProfessor />}
				</ProtectedRoute>
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
						<ProtectedRoute rol='profesor'>
							{<Chat />}
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
			path: '/secretaria',
			element: (
				<ProtectedRoute rol='analitica'>
					{<HomeAnalitycs />}
				</ProtectedRoute>
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
						<ProtectedRoute rol='analitica'>
							{<Chat />}
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
						<ProtectedRoute rol='analitica'>
							{<ByRol />}
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/administrador',
			element: (
				<ProtectedRoute rol='administrador'>
					{<HomeAdmin />}
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
					path: 'resumen',
					element: (
						<ProtectedRoute rol='analitica'>
							{<Resumen />}
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
				{
					path: 'finalizacion',
					element: (
						<ProtectedRoute rol='administrador'>
							<AproveThesis />
						</ProtectedRoute>
					),
				},
			],
		},
	],
	{
		basename: '/unidad-tesis',
	}
);

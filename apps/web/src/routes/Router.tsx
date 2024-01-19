import Dashboard from '@/components/Layout/Dashboard/Dashboard';
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
const Home = lazy(() => import('@/pages/Home/Home'));
const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'));
const UserProfile = lazy(
	() => import('@/pages/Sesion/UserProfile/UserProfile')
);
const Chat = lazy(() => import('@/pages/Chat/Chat'));
// --------------------
// STUDENT PAGES
// --------------------
const StudentProgress = lazy(
	() => import('@/pages/estudiante/Progress/Progress')
);
const StudentThesisCover = lazy(
	() => import('@/pages/estudiante/ThesisCover/ThesisCover')
);
const StudentCourseI = lazy(() => import('@/pages/estudiante/CourseI/CourseI'));
const StudentCourseII = lazy(
	() => import('@/pages/estudiante/CourseII/CourseII')
);
const StudentThemeChange = lazy(
	() => import('@/pages/estudiante/TopicChange/TopicChange')
);
const StudentCommissionStyle = lazy(
	() => import('@/pages/estudiante/CommisionStyle/CommissionStyle')
);
const StudentInternaReviews = lazy(
	() => import('@/pages/estudiante/InternalReviews/InternalReviews')
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
const ReviewThesisProfessor = lazy(
	() => import('@/pages/evaluador/ReviewThesis/ReviewThesis')
);

// --------------------
// COORDINATOR PAGES
// --------------------
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
	() => import('@/pages/encargado/ReviewThesis/ReviewThesis')
);
// --------------------
// REPORT PAGES
// --------------------
// const ByEstacion = lazy(() => import('@/pages/analitica/ByEstacion'));
// const ByRol = lazy(() => import('@/pages/analitica/ByRol'));
const Resumen = lazy(() => import('@/pages/reporte/Resumen/Resumen'));
const Progresos = lazy(() => import('@/pages/reporte/Progresos/Progresos'));
// --------------------
// ADMINISTRATOR PAGES
// --------------------
const PagesApp = lazy(() => import('@/pages/administrador/PagesApp/PagesApp'));
const UsersApp = lazy(() => import('@/pages/administrador/Usuarios/Usuarios'));
const Courses = lazy(() => import('@/pages/administrador/Courses/Courses'));
const Schedule = lazy(() => import('@/pages/administrador/Schedule/Schedule'));
const Aplicacion = lazy(() => import('@/pages/administrador/Aplicacion'));
const ProblemsApp = lazy(() => import('@/pages/administrador/Problemas'));
const AproveThesis = lazy(
	() => import('@/pages/administrador/AproveThesis/AproveThesis')
);
const PrintThesis = lazy(
	() => import('@/pages/administrador/PrintThesis/PrintThesis/PrintThesis')
);
const Acceso = lazy(() => import('@/pages/aplicacion/Acceso/Acceso'));
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
			path: '/administrador',
			element: (
				<ProtectedRoute rol='administrador'>
					<Dashboard />
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
					path: 'chat',
					element: (
						<ProtectedRoute rol='administrador'>
							{<Chat />}
						</ProtectedRoute>
					),
				},
				// {
				// 	path: 'revisiones-tesis',
				// 	element: (
				// 		<ProtectedRoute rol='administrador'>
				// 			<Aplicacion />
				// 		</ProtectedRoute>
				// 	),
				// },
				// {
				// 	path: 'impresion-tesis',
				// 	element: (
				// 		<ProtectedRoute rol='administrador'>
				// 			<ProblemsApp />
				// 		</ProtectedRoute>
				// 	),
				// },
				{
					path: 'solicitud-impresion',
					element: (
						<ProtectedRoute rol='administrador'>
							<AproveThesis />
						</ProtectedRoute>
					),
				},
				{
					path: 'impresion-tesis',
					element: (
						<ProtectedRoute rol='administrador'>
							<PrintThesis />
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/aplicacion',
			element: (
				<ProtectedRoute rol='administrador'>
					<Dashboard />
				</ProtectedRoute>
			),
			children: [
				{
					path: 'paginas',
					element: (
						<ProtectedRoute rol='administrador'>
							<PagesApp />
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
					path: 'horarios',
					element: (
						<ProtectedRoute rol='administrador'>
							<Schedule />
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
					path: 'accesos-rol',
					element: (
						<ProtectedRoute rol='administrador'>
							<Acceso />
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/docente',
			element: (
				<ProtectedRoute rol='profesor'>
					<Dashboard />
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
					path: 'curso-I',
					element: (
						<ProtectedRoute rol='profesor'>
							{<FstCourseProfessor />}
						</ProtectedRoute>
					),
				},
				{
					path: 'curso-II',
					element: (
						<ProtectedRoute rol='profesor'>
							{<SndCourseProfessor />}
						</ProtectedRoute>
					),
				},
				{
					path: 'comision-y-estilos',
					element: (
						<ProtectedRoute rol='profesor'>
							{<ThesisProfessor />}
						</ProtectedRoute>
					),
				},
				{
					path: 'previos-internos',
					element: (
						<ProtectedRoute rol='profesor'>
							{<ReviewThesisProfessor />}
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/encargado',
			element: (
				<ProtectedRoute rol='encargado'>
					<Dashboard />
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
					path: 'curso-I',
					element: (
						<ProtectedRoute rol='encargado'>
							{<FstCourseResponsible />}
						</ProtectedRoute>
					),
				},
				{
					path: 'curso-II',
					element: (
						<ProtectedRoute rol='encargado'>
							{<SndCourseResponsible />}
						</ProtectedRoute>
					),
				},
				{
					path: 'comision-y-estilos',
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
			path: '/estudiante',
			element: (
				<ProtectedRoute rol='estudiante'>
					<Dashboard />
				</ProtectedRoute>
			),
			children: [
				{
					path: 'perfil',
					element: (
						<ProtectedRoute rol='estudiante'>
							{/* <Suspense fallback={<Profile />}>
								<UserProfile />
							</Suspense> */}
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
					path: 'curso-I',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentCourseI />}
						</ProtectedRoute>
					),
				},
				{
					path: 'curso-II',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentCourseII />}
						</ProtectedRoute>
					),
				},
				{
					path: 'cambio-tema',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentThemeChange />}
						</ProtectedRoute>
					),
				},
				{
					path: 'comision-y-estilos',
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
					path: 'solicitud-impresion',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentPrintingRequest />}
						</ProtectedRoute>
					),
				},
				{
					path: 'entrega-tesis',
					element: (
						<ProtectedRoute rol='estudiante'>
							{<StudentPrintedThesis />}
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/reporte',
			element: (
				<ProtectedRoute rol='analitica'>
					<Dashboard />
				</ProtectedRoute>
			),
			children: [
				{
					path: 'resumen',
					element: (
						<ProtectedRoute rol='analitica'>
							{<Resumen />}
						</ProtectedRoute>
					),
				},
				{
					path: 'progresos',
					element: (
						<ProtectedRoute rol='analitica'>
							{<Progresos />}
						</ProtectedRoute>
					),
				},
			],
		},
		{
			path: '/secretaria',
			element: (
				<ProtectedRoute rol='analitica'>
					<Dashboard />
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
					path: 'asesor-tesis',
					element: (
						<ProtectedRoute rol='encargado'>
							{<StudentTutor />}
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

import {
	BrowserRouter,
	Routes,
	Route,
	createBrowserRouter,
} from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Logup from '../pages/Logup';
import Recovery from '../pages/Recovery';
import HomeReporte from '../pages/analitica/Home';
import HomeEncargado from '../pages/encargado/Home';
import HomeEstudiante from '../pages/estudiante/Home';
import HomeEvaluador from '../pages/evaluador/Home';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import Progress from '../pages/estudiante/Progress';
import Estacion1 from '../pages/estudiante/Station1';
import Estacion2 from '../pages/estudiante/Station2';
import Estacion3 from '../pages/estudiante/Station3';
import Estacion4 from '../pages/estudiante/Station4';
import Estacion5 from '../pages/estudiante/Station5';
import Asignar from '../pages/encargado/Asignar';
import Citas from '../pages/encargado/Citas';
import Resumen from '../pages/analitica/Resumen';
import RevisionCurso from '../pages/evaluador/RevisionCurso';
import RevisionDocumento from '../pages/evaluador/RevisionDoc';
import ByEstacion from '../pages/analitica/ByEstacion';
import ByRol from '../pages/analitica/ByRol';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/logup',
		element: <Logup />,
	},
	{
		path: '/recovery',
		element: <Recovery />,
	},
	{
		path: '/estudiante',
		element: (
			<ProtectedRoute isAllowed={true}>
				{<HomeEstudiante />}
			</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Profile />}
					</ProtectedRoute>
				),
			},
			{
				path: 'progreso',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Progress />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion1',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Estacion1 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion2',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Estacion2 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion3',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Estacion3 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion4',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Estacion4 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion5',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Estacion5 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'finalizar',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Estacion5 />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/encargado',
		element: (
			<ProtectedRoute isAllowed={true}>
				{<HomeEncargado />}
			</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Profile />}
					</ProtectedRoute>
				),
			},
			{
				path: 'asignar',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Asignar />}
					</ProtectedRoute>
				),
			},
			{
				path: 'citas',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Citas />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/evaluador',
		element: (
			<ProtectedRoute isAllowed={true}>
				{<HomeEvaluador />}
			</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Profile />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion1',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<RevisionDocumento />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion2',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<RevisionCurso />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion3',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<RevisionCurso />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion4',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<RevisionDocumento />}
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/analiticas',
		element: (
			<ProtectedRoute isAllowed={true}>{<HomeReporte />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Profile />}
					</ProtectedRoute>
				),
			},
			{
				path: 'resumen',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Resumen />}
					</ProtectedRoute>
				),
			},
			{
				path: 'por-estacion',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<ByEstacion />}
					</ProtectedRoute>
				),
			},
			{
				path: 'por-rol',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<ByRol />}
					</ProtectedRoute>
				),
			},
		],
	},
]);

const Rutas = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logup' element={<Logup />} />
				<Route path='/recovery' element={<Recovery />} />
				<Route
					path='/estudiante'
					element={
						<ProtectedRoute isAllowed={true}>
							{<HomeEstudiante />}
						</ProtectedRoute>
					}
				/>
				<Route
					path='/encargado'
					element={
						<ProtectedRoute isAllowed={true}>
							{<HomeEncargado />}
						</ProtectedRoute>
					}
				/>
				<Route
					path='/evaluador'
					element={
						<ProtectedRoute isAllowed={true}>
							{<HomeEvaluador />}
						</ProtectedRoute>
					}
				/>
				<Route
					path='/analiticas'
					element={
						<ProtectedRoute isAllowed={true}>
							{<HomeReporte />}
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Rutas;

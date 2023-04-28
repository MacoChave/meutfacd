import {
	BrowserRouter,
	Routes,
	Route,
	createBrowserRouter,
} from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Sesion/Login';
import Logup from '../pages/Sesion/Logup';
import Recovery from '../pages/Sesion/Recovery';
import HomeEstudiante from '../pages/estudiante';
import Progress from '../pages/estudiante/Progress';
import Estacion1 from '../pages/estudiante/Station1';
import Estacion2 from '../pages/estudiante/Station2';
import Estacion3 from '../pages/estudiante/Station3';
import Estacion4 from '../pages/estudiante/Station4';
import Estacion5 from '../pages/estudiante/Station5';
import HomeEncargado from '../pages/encargado';
import Asignar from '../pages/encargado/Asignar';
import Citas from '../pages/encargado/Citas';
import HomeEvaluador from '../pages/evaluador';
import RevisionDocumento from '../pages/evaluador/RevisionDoc';
import RevisionCurso from '../pages/evaluador/RevisionCurso';
import HomeReporte from '../pages/analitica';
import Resumen from '../pages/analitica/Resumen';
import ByEstacion from '../pages/analitica/ByEstacion';
import ByRol from '../pages/analitica/ByRol';
import HomeAdministrador from '../pages/administrador/Index';
import Usuarios from '../pages/administrador/Usuarios';
import Permisos from '../pages/administrador/Permisos';
import Actividades from '../pages/administrador/Actividades';
import Aplicacion from '../pages/administrador/Aplicacion';
import Problemas from '../pages/administrador/Problemas';
import Perfil from '../pages/Sesion/Profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login/:tipo',
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
						<Perfil />
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
						<Perfil />
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
						<Perfil />
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
		path: '/analitica',
		element: (
			<ProtectedRoute isAllowed={true}>{<HomeReporte />}</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Perfil />
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
	{
		path: '/administrador',
		element: (
			<ProtectedRoute isAllowed={true}>
				{<HomeAdministrador />}
			</ProtectedRoute>
		),
		children: [
			{
				path: 'perfil',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Perfil />
					</ProtectedRoute>
				),
			},
			{
				path: 'usuarios',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Usuarios />
					</ProtectedRoute>
				),
			},
			{
				path: 'permisos',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Permisos />
					</ProtectedRoute>
				),
			},
			{
				path: 'actividades',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Actividades />
					</ProtectedRoute>
				),
			},
			{
				path: 'aplicacion',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Aplicacion />
					</ProtectedRoute>
				),
			},
			{
				path: 'problemas',
				element: (
					<ProtectedRoute isAllowed={true}>
						<Problemas />
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

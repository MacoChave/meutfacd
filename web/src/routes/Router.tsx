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
import Station1 from '../pages/estudiante/Station1';
import Station2 from '../pages/estudiante/Station2';
import Station3 from '../pages/estudiante/Station3';
import Station4 from '../pages/estudiante/Station4';
import Station5 from '../pages/estudiante/Station5';
import Asignar from '../pages/encargado/Asignar';
import Citas from '../pages/encargado/Citas';
import Resumen from '../pages/analitica/Resumen';

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
						{<Station1 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion2',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Station2 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion3',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Station3 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion4',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Station4 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'estacion5',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Station5 />}
					</ProtectedRoute>
				),
			},
			{
				path: 'finalizar',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Station5 />}
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
	},
	{
		path: '/analiticas',
		element: (
			<ProtectedRoute isAllowed={true}>{<HomeReporte />}</ProtectedRoute>
		),
		children: [
			{
				path: 'resumen',
				element: (
					<ProtectedRoute isAllowed={true}>
						{<Resumen />}
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

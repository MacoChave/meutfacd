import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Logup from '../pages/Logup';
import Recovery from '../pages/Recovery';
import HomeReporte from '../pages/analitica/Home';
import HomeEncargado from '../pages/encargado/Home';
import HomeEstudiante from '../pages/estudiante/Home';
import HomeEvaluador from '../pages/evaluador/Home';
import Home from '../pages/Home';
import Login from '../pages/Login';

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

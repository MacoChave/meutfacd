import { Outlet } from 'react-router-dom';
import Dashboard from '../../layaouts/Dashboard';

const HomeEstudiante = () => {
	return (
		<Dashboard>
			<Outlet />
		</Dashboard>
	);
};

export default HomeEstudiante;

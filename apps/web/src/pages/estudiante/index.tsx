import { Outlet } from 'react-router-dom';
import Dashboard from '../../layouts/Dashboard';
import { MenuItem } from '../../propTypes/Appbar';
import {
	Assignment,
	Description,
	Groups,
	Home,
	Preview,
} from '@mui/icons-material';
import { Box, Toolbar } from '@mui/material';
import { useFetch } from '@/hooks/useFetch';
import { Loader } from '@/components';
import { URL } from '@/api/server';

// const menuArray: MenuItem[] = [
// 	{
// 		nombre: 'Progreso',
// 		description: 'Ver mi progreso del proceso',
// 		ruta: 'progreso',
// 		icon: <Home />,
// 	},
// 	{
// 		nombre: 'Estación 1',
// 		description: 'Enviar punto de tesis',
// 		ruta: 'estacion1',
// 		icon: <Description />,
// 	},
// 	{
// 		nombre: 'Estación 2',
// 		description: 'Curso 1',
// 		ruta: 'estacion2',
// 		icon: <Assignment />,
// 	},
// 	{
// 		nombre: 'Estación 3',
// 		description: 'Curso 2',
// 		ruta: 'estacion3',
// 		icon: <Assignment />,
// 	},
// 	{
// 		nombre: 'Estación 4',
// 		description: 'Comisión y estilo',
// 		ruta: 'estacion4',
// 		icon: <Preview />,
// 	},
// 	{
// 		nombre: 'Estación 5',
// 		description: 'Previos internos',
// 		ruta: 'estacion5',
// 		icon: <Groups />,
// 	},
// 	{
// 		nombre: 'Finalizar',
// 		description: 'Finalizar proceso',
// 		ruta: 'finalizar',
// 		icon: <Assignment />,
// 	},
// ];

const HomeEstudiante = () => {
	const {
		data: options,
		isLoading,
		isError,
	} = useFetch({
		url: `${URL.PERMISSION}/all`,
		params: {},
	});

	if (isLoading) return <Loader />;
	if (isError) return <div>Error</div>;

	return (
		<Dashboard>
			<Box
				sx={{
					width: '90%',
					mx: 'auto',
				}}>
				<Toolbar />
				<Toolbar />
				<Outlet />
			</Box>
		</Dashboard>
	);
};

export default HomeEstudiante;

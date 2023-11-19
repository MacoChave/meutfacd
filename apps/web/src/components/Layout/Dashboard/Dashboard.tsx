import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useFetch } from '@/hooks/useFetch';
import { Box, Typography } from '@mui/material';
import { FC, lazy, useState } from 'react';
const ToolbarWithSesion = lazy(
	() => import('../ToolbarWithSession/ToolbarWithSession')
);
const Sidebar = lazy(() => import('../Sidebar/Sidebar'));
const Content = lazy(() => import('../Content/Content'));
const Footer = lazy(() => import('../Footer/Footer'));

export type DashboardProps = {};

const Dashboard: FC<DashboardProps> = ({}) => {
	const { data, isLoading, isError } = useFetch({
		url: `${URL.PERMISSION}/all`,
	});
	const [open, setOpen] = useState(false);

	const handleToogleMenu = () => {
		setOpen(!open);
	};

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<Box
			component='main'
			sx={{
				display: 'grid',
				gridTemplateAreas: `'header header' '${
					open ? 'sidebar' : 'main'
				} main' 'footer footer'`,
				gridTemplateRows: 'auto 1fr auto',
				// gridTemplateColumns: { xs: '50px 1fr', md: '200px 1fr' },
				height: '95vh',
			}}>
			<>
				<ToolbarWithSesion handleToogleMenu={handleToogleMenu} />
				<Sidebar menuArray={data || []} open={open} setOpen={setOpen} />
				<Content />
				<Footer />
			</>
		</Box>
	);
};

export default Dashboard;

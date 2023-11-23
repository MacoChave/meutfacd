import { URL } from '@/consts/Api';
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
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				height: '96vh',
				justifyContent: 'space-between',
				overflow: 'hidden',
			}}
			width={open ? 'calc(100% - 200px)' : '100%'}
			pl={open ? '200px' : '0'}>
			<>
				<ToolbarWithSesion handleToogleMenu={handleToogleMenu} />
				<Sidebar menuArray={data || []} open={open} setOpen={setOpen} />
				<Content />
				<Box sx={{ flex: 1 }} />
				<Footer />
			</>
		</Box>
	);
};

export default Dashboard;
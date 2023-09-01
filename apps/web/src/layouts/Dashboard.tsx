import { Box, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import Sidebar from '../components/navegacion/Sidebar';
import { ToolbarWithSesion } from '../components/navegacion/Toolbar';
import { MenuItem } from '../propTypes/Appbar';
import { useFetch } from '@/hooks/useFetch';
import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';

const Dashboard = ({
	menuArray,
	children,
}: {
	menuArray?: MenuItem[];
	children: ReactNode;
}) => {
	const { data, isLoading, isError } = useFetch({
		url: `${URL.PERMISSION}/all`,
	});
	const [open, setOpen] = useState(false);

	if (isLoading) return <DotsLoaders />;
	if (isError) return <p>Error</p>;

	return (
		<Box
			component='main'
			sx={{
				display: 'grid',
				gridTemplateAreas:
					"'header header' 'sidebar main' 'sidebar footer'",
				gridTemplateRows: 'auto 1fr auto',
				gridTemplateColumns: { xs: '50px 1fr', md: '200px 1fr' },
				height: '95vh',
			}}>
			<>
				<ToolbarWithSesion />
				<Sidebar menuArray={data || []} open={open} setOpen={setOpen} />
				{children}
				<Box
					sx={{
						gridArea: 'footer',
						width: '90%',
						mx: 'auto',
						p: 1,
					}}>
					<Typography
						sx={{
							textAlign: 'center',
							fontSize: { xs: '0.6rem', md: '0.8rem' },
							py: 2,
						}}>
						Administración 2021-2025 © Decano Henry Arriaga
					</Typography>
				</Box>
			</>
		</Box>
	);
};

export default Dashboard;

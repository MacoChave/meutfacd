import { Box, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import Sidebar from '../components/navegacion/Sidebar';
import { ToolbarWithSesion } from '../components/navegacion/Toolbar';
import { MenuItem } from '../propTypes/Appbar';

const Dashboard = ({
	menuArray,
	children,
}: {
	menuArray: MenuItem[];
	children: ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Box
			component='main'
			sx={{
				display: 'grid',
				gridTemplateAreas:
					"'header header' 'sidebar main' 'sidebar footer'",
				gridTemplateRows: 'auto 1fr auto',
				gridTemplateColumns: { xs: '50px 1fr', md: '200px 1fr' },
				height: '100vh',
				width: '100vw',
			}}>
			<>
				<ToolbarWithSesion />
				{menuArray.length > 0 && (
					<Sidebar
						menuArray={menuArray}
						open={open}
						setOpen={setOpen}
					/>
				)}
				{children}
				<Box
					sx={{
						gridArea: 'footer',
						// position: 'fixed',
						// bottom: 0,
						width: '90%',
						mx: 'auto',
						p: 1,
					}}>
					<Typography
						sx={{
							textAlign: 'center',
							fontSize: { xs: '0.6rem', md: '0.8rem' },
						}}>
						Administración 2021-2025 © Decano Henry Arriaga
					</Typography>
				</Box>
			</>
		</Box>
	);
};

export default Dashboard;

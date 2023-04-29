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
		<Box sx={{ display: 'flex' }}>
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
				<Box>
					<Typography textAlign='center'>
						Administración 2021-2025 Decano Henry Arraiga
					</Typography>
				</Box>
			</>
		</Box>
	);
};

export default Dashboard;

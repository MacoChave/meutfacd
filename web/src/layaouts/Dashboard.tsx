import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { MenuItem } from '../propTypes/Appbar';
import { ToolbarWithSesion } from '../components/Toolbar';

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
			<ToolbarWithSesion />
			<Sidebar menuArray={menuArray} open={open} setOpen={setOpen} />
			{children}
		</Box>
	);
};

export default Dashboard;

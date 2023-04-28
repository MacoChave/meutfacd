import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import Sidebar from '../components/navegacion/Sidebar';
import { MenuItem } from '../propTypes/Appbar';
import { ToolbarWithSesion } from '../components/navegacion/Toolbar';

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
			{menuArray.length > 0 && (
				<Sidebar menuArray={menuArray} open={open} setOpen={setOpen} />
			)}
			{children}
		</Box>
	);
};

export default Dashboard;
